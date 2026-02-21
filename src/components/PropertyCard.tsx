interface PropertyCardProps {
  id: string;
  title: string;
  address: string;
  price: number;
  imageUrl?: string;
}

export default function PropertyCard({ id, title, address, price, imageUrl }: PropertyCardProps) {
  return (
    <a
      href={`/imovel/${id}`}
      className="group block overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="aspect-video bg-muted">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
            Sem foto
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{address}</p>
        <p className="mt-2 text-lg font-bold text-primary">
          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price)}
        </p>
      </div>
    </a>
  );
}
