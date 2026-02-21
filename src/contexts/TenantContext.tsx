import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TenantData {
  tenantId: string;
  portalJwt: string;
  expiresAt: number;
}

interface TenantContextType {
  tenant: TenantData | null;
  isLoading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  isLoading: true,
  error: null,
});

export const useTenant = () => useContext(TenantContext);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<TenantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolveTenant = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams(window.location.search);
      const host = params.get("tenant_host") || window.location.host;

      const { data, error: fnError } = await supabase.functions.invoke("resolve-tenant", {
        body: { host },
      });

      if (fnError) throw fnError;

      if (!data?.tenant_id) {
        setError("Domínio não encontrado");
        return;
      }

      setTenant({
        tenantId: data.tenant_id,
        portalJwt: data.portal_jwt,
        expiresAt: Date.now() + (data.expires_in ?? 900) * 1000,
      });
    } catch (err: any) {
      console.error("Erro ao resolver tenant:", err);
      setError(err?.message || "Erro ao carregar portal");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    resolveTenant();
  }, []);

  // Auto-refresh before expiry
  useEffect(() => {
    if (!tenant) return;
    const ms = tenant.expiresAt - Date.now() - 60_000;
    if (ms <= 0) return;
    const timer = setTimeout(resolveTenant, ms);
    return () => clearTimeout(timer);
  }, [tenant]);

  return (
    <TenantContext.Provider value={{ tenant, isLoading, error }}>
      {children}
    </TenantContext.Provider>
  );
}
