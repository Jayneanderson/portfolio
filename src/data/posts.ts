export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
}

export function readingTime(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*`_>\-\[\]()]/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export const posts: Post[] = [
  {
    slug: "como-estruturo-api-restful-do-zero",
    title: "Como eu estruturo uma API RESTful do zero",
    excerpt:
      "Depois de construir várias APIs, desenvolvi uma estrutura que escala, facilita manutenção e deixa o código legível para qualquer dev do time. Aqui está como eu faço.",
    date: "2024-01-20",
    tags: ["Backend", "Node.js", "Arquitetura", "Express"],
    content: `
> ⚠️ Estrutura legada. Atualmente, eu utilizo Nest com outra estrutura.

## Por que estrutura importa

Você consegue escrever uma API que funciona em qualquer estrutura. O problema é quando ela precisa crescer, quando outro dev precisa fazer manutenção, ou quando você volta ao código 3 meses depois.

Uma boa estrutura reduz fricção. Você sabe onde cada coisa fica. Mudanças são isoladas. Testes são possíveis.

---

## A estrutura que uso

\`\`\`
src/
├── app.ts              # Express setup: middlewares, rotas globais
├── index.ts            # Entry point: inicia o servidor
├── routes/
│   ├── index.ts        # Monta todos os sub-roteadores
│   └── users.ts        # Rotas de /users
├── controllers/
│   └── users.ts        # Lógica de request/response
├── services/
│   └── users.ts        # Lógica de negócio
├── repositories/
│   └── users.ts        # Acesso ao banco de dados
├── middlewares/
│   ├── auth.ts         # Autenticação
│   └── validate.ts     # Validação com Zod
└── lib/
    ├── db.ts           # Conexão com o banco
    └── logger.ts       # Logger estruturado
\`\`\`

---

## Cada camada tem uma responsabilidade

### Route → só define endpoints

\`\`\`typescript
// src/routes/users.ts
import { Router } from "express";
import { authenticate } from "@/middlewares/auth";
import { validate } from "@/middlewares/validate";
import { createUserSchema } from "@/schemas/users";
import { UsersController } from "@/controllers/users";

const router = Router();
const controller = new UsersController();

router.get("/", authenticate, controller.list);
router.post("/", authenticate, validate(createUserSchema), controller.create);
router.get("/:id", authenticate, controller.findById);

export default router;
\`\`\`

### Controller → só lida com HTTP

\`\`\`typescript
// src/controllers/users.ts
import { Request, Response } from "express";
import { UsersService } from "@/services/users";

export class UsersController {
  private service = new UsersService();

  list = async (req: Request, res: Response) => {
    const users = await this.service.findAll();
    res.json(users);
  };

  create = async (req: Request, res: Response) => {
    const user = await this.service.create(req.body);
    res.status(201).json(user);
  };

  findById = async (req: Request, res: Response) => {
    const user = await this.service.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(user);
  };
}
\`\`\`

### Service → lógica de negócio

\`\`\`typescript
// src/services/users.ts
import { UsersRepository } from "@/repositories/users";
import { hashPassword } from "@/lib/crypto";

export class UsersService {
  private repo = new UsersRepository();

  async findAll() {
    return this.repo.findAll();
  }

  async create(data: { name: string; email: string; password: string }) {
    const existing = await this.repo.findByEmail(data.email);
    if (existing) {
      throw new Error("E-mail já cadastrado");
    }

    const passwordHash = await hashPassword(data.password);
    return this.repo.create({ ...data, passwordHash });
  }

  async findById(id: string) {
    return this.repo.findById(id);
  }
}
\`\`\`

### Repository → só fala com o banco

\`\`\`typescript
// src/repositories/users.ts
import { db } from "@/lib/db";

export class UsersRepository {
  async findAll() {
    return db.select().from(usersTable);
  }

  async findByEmail(email: string) {
    return db.select().from(usersTable).where(eq(usersTable.email, email)).get();
  }

  async create(data: InsertUser) {
    return db.insert(usersTable).values(data).returning().get();
  }

  async findById(id: string) {
    return db.select().from(usersTable).where(eq(usersTable.id, id)).get();
  }
}
\`\`\`

---

## Validação com Zod no middleware

\`\`\`typescript
// src/middlewares/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(422).json({
        error: "Dados inválidos",
        details: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data; // dados já sanitizados e tipados
    next();
  };
}
\`\`\`

---

## Tratamento global de erros

\`\`\`typescript
// src/app.ts (ao final, depois das rotas)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message === "E-mail já cadastrado") {
    return res.status(409).json({ error: err.message });
  }

  // Log do erro inesperado
  req.log.error({ err }, "Unhandled error");

  res.status(500).json({ error: "Erro interno do servidor" });
});
\`\`\`

---

## Por que não coloco tudo no controller?

É tentador. Funciona. Mas quando você precisa testar a lógica de negócio, você não quer precisar mockar o Express inteiro. Com a separação em service, você testa a lógica pura:

\`\`\`typescript
// Teste unitário do service — sem Express, sem banco real
it("deve lançar erro se e-mail já existir", async () => {
  mockRepo.findByEmail.mockResolvedValue({ id: "1", email: "teste@test.com" });

  await expect(service.create({ email: "teste@test.com", ... })).rejects.toThrow(
    "E-mail já cadastrado"
  );
});
\`\`\`

---

## O que essa estrutura resolve

- **Legibilidade**: cada arquivo tem um propósito único e claro
- **Testabilidade**: services são funções puras sem dependência de HTTP
- **Escalabilidade**: adicionar um novo recurso segue o mesmo padrão
- **Onboarding**: um dev novo sabe exatamente onde cada coisa fica

Não é perfeita para todos os projetos — uma função Lambda simples não precisa disso tudo. Mas para uma API que vai crescer com o time, é o padrão que eu aplico e recomendo.
`,
  },
];
