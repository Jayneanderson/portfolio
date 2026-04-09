import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-secondary-foreground">
              404 - Página não encontrada
            </h1>
          </div>

          <div>
            <p className="mt-4 text-sm text-secondary-foreground">
              Voltar à <Link href="/" className='text-primary font-bold'>página inicial</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
