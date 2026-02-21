import { useParams, Link } from "react-router-dom";
import { useTenant } from "@/contexts/TenantContext";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { ArrowLeft } from "lucide-react";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { tenant, isLoading, error } = useTenant();

  if (isLoading) {
    return <LoadingState title="Carregando..." description="Buscando detalhes do imóvel" />;
  }

  if (error || !tenant) {
    return <ErrorState title="Portal indisponível" description={error || "Tenant não encontrado"} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center gap-4 py-4 px-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">Detalhes do Imóvel</h1>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Imóvel ID: {id}</p>
        <p className="text-muted-foreground mt-2">
          Detalhes serão exibidos aqui após configuração das tabelas do banco de dados.
        </p>
      </section>
    </main>
  );
}
