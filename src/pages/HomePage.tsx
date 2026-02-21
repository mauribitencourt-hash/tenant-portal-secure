import { useTenant } from "@/contexts/TenantContext";
import PropertyGrid from "@/components/PropertyGrid";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

export default function HomePage() {
  const { tenant, isLoading, error } = useTenant();

  if (isLoading) {
    return <LoadingState title="Carregando portal..." description="Identificando imobiliária" />;
  }

  if (error || !tenant) {
    return (
      <ErrorState
        title="Portal indisponível"
        description={error || "Não foi possível identificar a imobiliária para este domínio."}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <h1 className="text-xl font-bold text-foreground">Portal de Imóveis</h1>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Imóveis Disponíveis</h2>
        <PropertyGrid tenantId={tenant.tenantId} portalJwt={tenant.portalJwt} />
      </section>
    </main>
  );
}
