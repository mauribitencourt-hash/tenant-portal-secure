import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  title: string;
  description?: string;
}

export default function LoadingState({ title, description }: LoadingStateProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
