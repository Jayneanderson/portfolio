export interface Project {
  slug: string;
  name: string;
  company: string;
  summary: string;
  highlights: string[];
  complexity: string;
  tech: string[];
  impact: string;
  github: string;
  liveUrl: string;
  images: string[];
  context: string;
  problem: string;
  solution: string;
  contributions: string[];
  technicalDecisions: string[];
}

export const projects: Project[] = [
  {
    slug: "gupy-admissao",
    name: "Gupy Admissão",
    company: "Gupy - Recursos Humanos",
    summary:
      "Construímos o módulo de benefício e permitimos o envio de documentos pela pessoa recrutadora no fluxo de admissão.",
    highlights: [
      "Formulários padronizados e customizáveis",
      "Geração de relatório de benefícios aderidos pelos pré-colaboradores",
      "Integração com fornecedor de assiantura de contrato (DocuSign)",
      "Inversão de lógica no envio de documentos do pré-colaborador",
    ],
    complexity: "Regra de negócio complexa",
    tech: [
      "Node.js",
      "TypeScript",
      "React",
      "DocuSign",
      "Json Schema",
      "Datadog",
    ],
    impact:
      "Redução no tempo de contratação de colaboradores após centralizar o processo de adesão aos benefícios das empresas parceiras e permitir que o recrutador enviasse documentos pelo pré-colaborador.",
    github: "#",
    liveUrl: "https://www.gupy.io/software-de-admissao-digital",
    images: [
      "../images/admission/admission_1.png",
      "../images/admission/admission_2.png",
      "../images/admission/admission_benefits_1.png",
      "../images/admission/admission_benefits_2.png",
      "../images/admission/admission_benefits_3.png",
    ],
    context: `A Gupy precisava de duas soluções que foram abordadas em momentos diferentes:${"\n"} 
      1) módulo de benefícios para que a pessoa recrutadora não precisasse sair da plataforma de admissão para permitir adesão a benefícios; 2) permitir o RH enviar os documentos no lugar do pré-colaborador com pouco conhecimento de plataforma digital.`,
    problem:
      "1) as empresas precisam sair da plataforma de admissão para realiziar a adesão de benefícios em outro local. Isso aumentava o tempo de contratação, carga cognitiva e dificuldade em manusear várias ferramentas; 2) o envio de documentos costuma ser feito pelo colaborador, mas foi identificado um grande público que tinha dificuldade em lidar com tecnologia, ocasionando em erros humanos e reenvio de documentos.",
    solution:
      "1) desenvolvemos o módulo de benefícios utilizando Json Schema e com integração com a DocuSign para garantir flexibilidade nos formulários e assinatura online de contrato, além de relatórios; 2) realizamos uma investigação profunda das regras de negócio para permitir a inversão da lógica de envio documentos pelo RH, resultando em uma refatoração intensa.",
    contributions: [
      "Implementação e manutenção dos módulos de benefícios, principalmente o de assiantura digital",
      "Estudo e e implementação da integração com o parceiro de assinatura de contrato digital",
      "Desenvolvimento da exportação de relatório de benefícios, bem como exportação de PDF das assinaturas realizadas",
    ],
    technicalDecisions: [
      "Optamos por utilizar o SDK disponibilizado pela DocuSign para acelerar a integração e manter consistência com a documentação da API",
      "Optamos por processamento assíncrono para geração de contrato e de relatório de benefícios",
      "Realizamos uma grande mudança nas regras de negócio para permitir que o analista enviasse os documentos ao invés de criar um módulo novo",
    ],
  },
  {
    slug: "pravaler",
    name: "Pravaler - Simulação",
    company: "Pravaler - Financiamento estudantil",
    summary:
      "Contruímos o fluxo novo de simulação de cursos, desde o cadastro até o login do aluno, bem como a inserção de uma nova forma de indicação a partir de microsserviços",
    highlights: [
      "Permitir e rastrear simulações do aluno sem realização de cadastro",
      "Integração entre microsserviços",
      "Evolução do fluxo de autenticação e troca senha",
      "Criação de novo fluxo de indicação Member Get Member (entre alunos)",
    ],
    complexity: "Regra de negócio complexa",
    tech: [
      "Nest",
      "TypeScript",
      "Keycloak",
      "Saber em Rede",
      "Grafana",
      "New Relic",
    ],
    impact:
      "Aumento na captação e conversão de leads, bem como aumento no uso do fluxo de indicação.",
    github: "#",
    liveUrl: "https://www.pravaler.com.br/",
    images: [
      "../images/pravaler/pravaler_1.png",
      "../images/pravaler/pravaler_2.png",
      "../images/pravaler/pravaler_3.png",
      "../images/pravaler/pravaler_4.png",
      "../images/pravaler/pravaler_indication_1.png",
      "../images/pravaler/pravaler_indication_2.png",
    ],
    context:
      "O Pravaler precisava reescrever os sistemas responsáveis pelo cadastro, simulção e autenticação do aluno a partir de tecnologias modernas que permitisse escalabilidade.",
    problem:
      "Por conta da tecnologia desatualizada, o sistema tinha dificuldade de evoluir, gerando gargalos no processo de financiamento. Nesse sentido, foi preciso criar novos microsserviços, bem como novas experiências para o aluno focando no topo de funil para maior conversão de leads.",
    solution:
      "Portanto, desenvolvemos novos microsserviços de captação de lead, simulação e autenticação do aluno, bem como um novo fluxo de indicação.",
    contributions: [
      "Mapeamento e tradução das regras de negócio para manter retrocompatibilidade",
      "Evolução do novo fluxo de login e implementação de recuperação de senha",
      "Desenvolvimento do fluxo de indicação, com integração com o Saber em Rede",
      "Criação de dashboards e métricas dos microsserviços",
    ],
    technicalDecisions: [
      "Escolha de banco de dados não-relacional para captação escalável de leads",
      "Uso de comunicação assíncrona para sincronização entre os microsserviços",
    ],
  },
  {
    slug: "seu-pedacinho",
    name: "Seu Pedacinho",
    company: "Jayneanderson",
    summary:
      "Construí esse site para destacar bons empreendimentos da cidade de Cachoeira e região.",
    highlights: [
      "Filtros rápidos de empreendedores",
      "Gerar conexão entre empreendedores (as) e clientes",
    ],
    complexity: "Sistema em produção",
    tech: ["React", "TypeScript",],
    impact: "Aumento de alcance de empreendimentos de Cachoeira.",
    github: "#",
    liveUrl: "https://seu-pedacinho.jayneanderson.dev",
    images: [
      "../images/seu-pedacinho/seu_pedacinho_1.png",
      "../images/seu-pedacinho/seu_pedacinho_2.png",
    ],
    context:
      "A cidade de Cachoeira e região possui diversos talentos, porém, muitas vezes, é difícil localizá-los, sendo necessário entrar em contato com outras pessoas que possam conhecer esses talentos.",
    problem:
      "Contudo, esse processo nem sempre é efetivo e pode ser demorado aguardar respostas. Nesse sentido, é preciso pensar em formas de conectar os empreendedores (as) com possíveis clientes.",
    solution:
      "Portanto, desenvolvi o Seu Pedacinho para que seja possível encontrar pessoas com poucos cliques.",
    contributions: [
      "Mapeei e dialoguei com diversos empreenderoes (as) da cidade para destacar seus negócios",
      "Facilitei a conexão dos empreendedores (as) locais com clientes",
    ],
    technicalDecisions: [
      "Escolhi Node.js com React para aproveitar o ecossistema de front e back visando evoluir a ferramenta no futuro",
    ],
  },
];
