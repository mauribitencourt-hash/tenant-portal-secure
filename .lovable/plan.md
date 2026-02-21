

# Reestruturar Projeto para Lovable (Vite + React + Supabase)

## Situacao Atual

O projeto atual e um clone Next.js 16 ("Vibe") com Prisma, tRPC e Clerk -- totalmente incompativel com a plataforma Lovable. Todos os build errors decorrem disso.

## Plano de Acao

### Fase 1 -- Criar Estrutura Base Lovable

Substituir toda a estrutura Next.js por uma SPA Vite + React + TypeScript + Tailwind:

- Criar `index.html` na raiz com div root
- Criar `vite.config.ts` com aliases e plugins React
- Atualizar `package.json`: trocar dependencias Next.js/Prisma/tRPC por Vite, React Router, Supabase JS Client; adicionar script `build:dev`
- Criar `src/main.tsx` como entry point
- Criar `src/App.tsx` com React Router

### Fase 2 -- Conectar Supabase (Lovable Cloud)

Habilitar Lovable Cloud para provisionar Supabase automaticamente:

- Criar `src/integrations/supabase/client.ts` com o client Supabase
- Configurar variaveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

### Fase 3 -- Banco de Dados Multi-Tenant (Rota B)

Criar via migrations SQL:

1. **Tabela `tb_dominio_imobiliaria`** -- mapeia host para tenant
2. **View `vw_imobiliaria_publica`** -- expoe apenas campos seguros
3. **Funcao `current_tenant_id()`** -- extrai tenant_id do JWT
4. **Policies RLS** em `tb_imovel`, `tb_imovel_foto`, `tb_unidade`, `tb_imovel_solicitacao`

### Fase 4 -- Edge Function `resolve-tenant`

- Recebe host, consulta `tb_dominio_imobiliaria`
- Gera JWT curto (15 min) com claims `tenant_id`, `role`, `aud`
- Retorna `tenant_id`, `portal_jwt`, `expires_in`
- CORS configurado corretamente

### Fase 5 -- Portal React

- **TenantProvider**: resolve tenant no mount via host, chama Edge Function, armazena JWT em contexto
- **Supabase Client dinamico**: injeta `portal_jwt` no header Authorization
- **Paginas**: listagem de imoveis, detalhe, formulario de lead
- **Estados**: loading, erro (dominio nao encontrado), expirado (re-resolve)
- **Fallback dev**: parametro `?tenant_host=` para testes em preview

### Fase 6 -- Remover Codigo Next.js

Apagar todos os arquivos incompativeis:

- `next.config.ts`, `prisma/`, `src/app/`, `src/trpc/`, `src/inngest/`
- Dependencias: `next`, `@clerk/*`, `@prisma/*`, `@trpc/*`, `inngest`, etc.

---

## Detalhes Tecnicos

### Estrutura de Pastas Final

```text
index.html
vite.config.ts
package.json
src/
  main.tsx
  App.tsx
  integrations/supabase/client.ts
  contexts/TenantContext.tsx
  hooks/useTenant.ts
  pages/
    HomePage.tsx
    PropertyDetailPage.tsx
    NotFoundPage.tsx
  components/
    PropertyCard.tsx
    PropertyGrid.tsx
    LeadForm.tsx
    LoadingState.tsx
    ErrorState.tsx
supabase/
  config.toml
  functions/resolve-tenant/index.ts
```

### Fluxo de Resolucao de Tenant

```text
Browser carrega Portal
  --> TenantProvider le window.location.host
  --> Chama Edge Function resolve-tenant(host)
  --> Edge Function consulta tb_dominio_imobiliaria
  --> Gera JWT com tenant_id nas claims
  --> Retorna portal_jwt ao frontend
  --> Supabase client usa portal_jwt
  --> RLS garante isolamento via current_tenant_id()
```

### Dependencias Necessarias

- `react`, `react-dom`, `react-router-dom`
- `@supabase/supabase-js`
- `@tanstack/react-query`
- `lucide-react`, `tailwind-merge`, `clsx`
- `date-fns`, `react-hot-toast`
- Radix UI primitives (dialog, dropdown, tabs)

### Pre-Requisito

Sera necessario habilitar **Lovable Cloud** (Supabase integrado) antes da implementacao para que as migrations SQL e Edge Functions possam ser provisionadas.

