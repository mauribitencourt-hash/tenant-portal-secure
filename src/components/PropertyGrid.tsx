import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
  tenantId: string;
  portalJwt: string;
}

export default function PropertyGrid({ tenantId }: PropertyGridProps) {
  // Placeholder — will be populated after DB tables are created
  return (
    <div className="text-center py-16">
      <p className="text-muted-foreground">
        Nenhum imóvel encontrado para o tenant <span className="font-mono text-xs">{tenantId}</span>.
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        As tabelas do banco de dados serão criadas na próxima etapa.
      </p>
    </div>
  );
}
