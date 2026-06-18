# Sangha KTL

Portal contemplativo para uma comunidade budista — meditação, estudo e acolhimento de novos praticantes.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Prisma** + **PostgreSQL**
- **Auth.js** (autenticação admin)
- **React Hook Form** + **Zod**

## Começando

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar ambiente

```bash
cp .env.example .env
```

Edite `.env` com sua `DATABASE_URL` e gere um `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 3. Banco de dados

**Opção A — Prisma Dev (recomendado, sem instalar PostgreSQL):**

```bash
npx prisma dev --detach
npm run db:setup
```

Copie a URL exibida pelo `prisma dev` para `DATABASE_URL` no `.env` (porta pode variar, ex.: `51214`).

**Opção B — PostgreSQL local (Docker ou instalado):**

Ajuste `DATABASE_URL` no `.env` e rode:

```bash
npm run db:setup
```

### 4. Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

**Admin:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)  
Credenciais padrão (seed): `admin@sangha.local` / `admin123`

## Estrutura

```
src/
├── actions/          # Server Actions (submissions, admin)
├── app/              # Rotas App Router
│   ├── admin/        # Área protegida
│   ├── ingresso/     # Formulário wizard
│   └── ...
├── components/
│   ├── admin/        # Dashboard, tabelas, login
│   ├── forms/        # Wizard + calendário
│   ├── layout/       # Header, footer, shell
│   └── ui/           # shadcn/ui
├── lib/              # Prisma, validações, constantes
└── generated/prisma/ # Cliente Prisma gerado
```

## Funcionalidades

### Público
- Página inicial, Quem Somos, Materiais, Encontros
- Formulário de ingresso em 5 etapas com calendário visual
- Protocolo interno gerado ao enviar

### Admin (`/admin`)
- Login protegido
- Dashboard com métricas
- Listagem com busca e filtros
- Detalhe completo de cada inscrição
- Exportação CSV

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run db:push` | Sincronizar schema com o banco |
| `npm run db:seed` | Criar usuário admin |
| `npm run db:studio` | Prisma Studio |
