
# Reestruturar Projeto para Lovable (Vite + React + Supabase)

## Status

### ✅ Fase 1 -- Estrutura Base Lovable (CONCLUÍDA)
- index.html, vite.config.ts, src/main.tsx, src/App.tsx criados
- Dependencias Next.js/Prisma/tRPC/Clerk removidas
- Tailwind CSS + design tokens configurados

### ✅ Fase 2 -- Lovable Cloud Habilitado (CONCLUÍDA)
- Supabase provisionado automaticamente
- Client em src/integrations/supabase/client.ts

### ⬜ Fase 3 -- Banco de Dados Multi-Tenant (Rota B)
- tb_dominio_imobiliaria, tb_imovel, tb_imovel_foto, tb_unidade, tb_imovel_solicitacao
- vw_imobiliaria_publica
- current_tenant_id()
- Policies RLS

### ⬜ Fase 4 -- Edge Function resolve-tenant

### ⬜ Fase 5 -- Conectar Portal às tabelas reais

### ✅ Fase 6 -- Remover Código Next.js (CONCLUÍDA)
