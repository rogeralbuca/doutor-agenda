# Doutor Agenda

Sistema de agendamento médico desenvolvido como parte do Bootcamp Fullstack Club.

## Tecnologias

O projeto utiliza as seguintes tecnologias:

- [Next.js 15](https://nextjs.org/) - Framework React para produção
- [React 19](https://react.dev/) - Biblioteca para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript tipado
- [TailwindCSS 4](https://tailwindcss.com/) - Framework CSS utilitário
- [Drizzle ORM](https://orm.drizzle.team/) - ORM TypeScript-first
- [PostgreSQL](https://www.postgresql.org/) via [Neon](https://neon.tech) - Banco de dados relacional
- [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI reutilizáveis
- [Radix UI](https://www.radix-ui.com/) - Primitivos de UI acessíveis
- [Lucide React](https://lucide.dev/) - Ícones SVG
- [Zod](https://zod.dev/) - Validação de esquemas TypeScript
- [Better Auth](https://www.better-auth.com/) - Sistema de autenticação moderno
- [Next Safe Action](https://next-safe-action.dev/) - Server Actions type-safe
- [Sonner](https://sonner.emilkowal.ski/) - Notificações toast
- [React Hook Form](https://react-hook-form.com/) - Gerenciamento de formulários
- [Day.js](https://day.js.org/) - Manipulação de datas
- [React Number Format](https://react-number-format.com/) - Formatação de números e valores
- [TanStack React Table](https://tanstack.com/table/latest) - Tabelas avançadas com paginação e filtros
- [TanStack React Query](https://tanstack.com/query/latest) - Gerenciamento de estado servidor
- [Stripe](https://stripe.com/) - Processamento de pagamentos e assinaturas

## Arquitetura e Boas Práticas

O projeto segue os princípios **SOLID** e **Clean Code**, implementando uma arquitetura em camadas bem estruturada:

### Service Layer

- **Separação de responsabilidades**: Cada service tem uma responsabilidade específica
- **Encapsulamento**: Todas as operações de banco de dados são isoladas nos services
- **Reutilização**: Services podem ser usados em diferentes partes da aplicação
- **Testabilidade**: Lógica de negócio separada da apresentação

Services implementados:

- `AuthService` - Gerenciamento de autenticação e sessões
- `DoctorsService` - Operações relacionadas a médicos
- `PatientsService` - Gerenciamento de pacientes
- `AppointmentsService` - Controle de agendamentos
- `DashboardService` - Dados agregados para o dashboard

### Princípios Aplicados

- **Single Responsibility Principle (SRP)**: Cada classe/service tem uma única responsabilidade
- **Open/Closed Principle (OCP)**: Código aberto para extensão, fechado para modificação
- **Dependency Inversion Principle (DIP)**: Components dependem de abstrações, não de implementações concretas

## Autenticação

O projeto implementa um sistema de autenticação completo com [Better Auth](https://www.better-auth.com/), oferecendo:

- Login/Registro de usuários
- Recuperação de senha
- Autenticação baseada em JWT
- Proteção de rotas
- Gestão de sessões seguras
- Sistema de clínicas multi-tenant

## Configuração do Ambiente

### Pré-requisitos

- Node.js
- PostgreSQL
- pnpm, npm ou yarn

### Instalação

1. Clone o repositório

```bash
git clone [url-do-repositorio]
cd doutor-agenda
```

2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure o banco de dados

   - Crie um arquivo `.env.local` com as variáveis de ambiente necessárias para a conexão com o PostgreSQL

4. **Para desenvolvimento completo com Stripe:**

   ```bash
   # Terminal 1 - Inicie a aplicação
   npm run dev

   # Terminal 2 - Inicie o Stripe CLI (após configurar)
   stripe listen --forward-to http://localhost:3000/api/stripe/webhook
   ```

### Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run start` - Inicia o servidor em modo de produção
- `npm run lint` - Executa o linter para verificar o código
- `npm run lint:fix` - Executa o linter e corrige automaticamente problemas que podem ser resolvidos

### Qualidade de Código (ESLint)

O projeto utiliza ESLint com configurações otimizadas para garantir qualidade e consistência do código:

#### Plugins e Configurações

- **ESLint Core**: Linting básico e regras fundamentais
- **@typescript-eslint**: Regras específicas para TypeScript
- **eslint-plugin-react**: Regras para React e JSX
- **eslint-plugin-simple-import-sort**: Organização automática de imports
- **eslint-config-next**: Configurações otimizadas para Next.js

#### Funcionalidades

- **Auto-fix imports**: Organização automática de imports por categoria (externos, internos, relativos)
- **TypeScript validation**: Verificação de tipos e regras específicas do TypeScript
- **React best practices**: Validação de hooks, componentes e padrões React
- **Next.js optimization**: Regras específicas para performance e SEO

#### Configuração de Imports

Os imports são automaticamente organizados em:

1. Bibliotecas externas (react, next, etc.)
2. Imports internos do projeto (@/)
3. Imports relativos (./, ../)

Para organizar os imports automaticamente:

```bash
npm run lint:fix
```

### Banco de Dados (Drizzle ORM)

Para gerenciar o banco de dados PostgreSQL, o projeto utiliza Drizzle ORM:

- `npx drizzle-kit push:pg` - Atualiza o esquema do banco de dados
- `npx drizzle-kit studio` - Interface visual para gerenciar o banco de dados
- `https://console.neon.tech/app/projects` - Console banco de dados Neon

### Scripts de Dados de Exemplo

Na pasta `.neon/` estão localizados scripts SQL para popular o banco de dados com dados de exemplo:

- `insert-doctors.sql` - Script para inserir médicos de exemplo com diferentes especialidades
- `insert-patients.sql` - Script para inserir pacientes de exemplo
- `insert-appointments.sql` - Script para inserir consultas de exemplo

**Importante:** Antes de executar os scripts, substitua `'YOUR_CLINIC_ID'` pelo ID real da sua clínica nos arquivos SQL.

### Stripe (Pagamentos e Assinaturas)

O projeto utiliza Stripe para processamento de pagamentos e gerenciamento de assinaturas. Para configurar o Stripe em desenvolvimento:

#### Configuração Inicial

1. **Crie uma conta no Stripe**

   - Acesse [https://dashboard.stripe.com](https://dashboard.stripe.com)
   - Crie uma conta ou faça login

2. **Configure as chaves de API**
   - No dashboard do Stripe, vá em **Developers > API keys**
   - Copie a **Publishable key** e **Secret key** do modo de teste
   - Adicione as chaves no arquivo `.env.local`:

```bash
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # Será configurado após instalar CLI
```

#### Instalação e Configuração do Stripe CLI

1. **Instale o Stripe CLI**

   - Windows (via chocolatey):

   ```powershell
   choco install stripe-cli
   ```

   - Ou baixe diretamente: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. **Faça login no Stripe CLI**

   ```bash
   stripe login
   ```

3. **Configure webhooks para desenvolvimento local**

   ```bash
   stripe listen --forward-to http://localhost:3000/api/stripe/webhook
   ```

   Este comando irá:

   - Gerar um endpoint secret (whsec\_...)
   - Redirecionar eventos do Stripe para sua aplicação local
   - Exibir eventos em tempo real no terminal

4. **Copie o webhook secret**
   - O comando acima exibirá um webhook secret
   - Adicione-o ao seu `.env.local` como `STRIPE_WEBHOOK_SECRET`

#### Testando Pagamentos

Para testar pagamentos em desenvolvimento, use os cartões de teste do Stripe:

- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 0002`
- **Requires 3D Secure**: `4000 0025 0000 3155`

**Data de expiração**: Qualquer data futura  
**CVC**: Qualquer código de 3 dígitos  
**CEP**: Qualquer CEP válido

#### Links Úteis

- [Dashboard Stripe (Teste)](https://dashboard.stripe.com/test/dashboard)
- [Documentação Stripe](https://stripe.com/docs)
- [Cartões de Teste](https://stripe.com/docs/testing)
- [Webhooks](https://stripe.com/docs/webhooks)

#### Eventos Suportados

A aplicação processa os seguintes eventos do Stripe:

- `invoice.paid` - Quando um pagamento é processado com sucesso
- `customer.subscription.deleted` - Quando uma assinatura é cancelada

## Estrutura do Projeto

```
doutor-agenda/
├── .neon/           # Scripts SQL para popular o banco com dados de exemplo
├── actions/         # Server actions type-safe com Next Safe Action
├── app/             # Aplicação Next.js e rotas da aplicação
│   ├── (auth)/      # Rotas de autenticação (login, registro, etc.)
│   ├── (protected)/ # Área restrita do sistema após login
│   │   ├── dashboard/      # Dashboard principal com visão geral
│   │   ├── patients/       # Gerenciamento de pacientes
│   │   ├── doctors/        # Gerenciamento de médicos
│   │   ├── appointments/   # Sistema de agendamentos
│   │   └── subscriptions/  # Planos e assinaturas
│   ├── api/         # Rotas de API
│   │   ├── auth/           # Endpoints de autenticação
│   │   └── stripe/         # Webhooks e endpoints do Stripe
│   └── layout.tsx   # Layout principal da aplicação
├── components/      # Componentes React reutilizáveis
│   ├── ui/          # Componentes de UI do shadcn
│   ├── forms/       # Componentes de formulário
│   └── shared/      # Componentes compartilhados
├── config/          # Arquivos de configuração
├── db/              # Configuração do Drizzle ORM e esquemas
│   ├── migrations/  # Migrações do banco de dados
│   ├── schema/      # Definição dos esquemas das tabelas
│   └── index.ts     # Configuração de conexão
├── emails/          # Templates de emails
├── hooks/           # Custom hooks React
├── lib/             # Utilitários e funções auxiliares
├── middleware.ts    # Middleware Next.js para proteção de rotas
├── providers/       # Providers React (temas, autenticação)
├── public/          # Arquivos estáticos
├── schemas/         # Esquemas de validação Zod
├── services/        # Service Layer - Lógica de negócio e acesso a dados
│   ├── auth-service.ts        # Serviços de autenticação
│   ├── doctors-service.ts     # Operações de médicos
│   ├── patients-service.ts    # Operações de pacientes
│   ├── appointments-service.ts # Operações de agendamentos
│   └── dashboard-service.ts   # Dados do dashboard
├── styles/          # Estilos globais
└── types/           # Definições de tipos TypeScript
```

## Funcionalidades

### Sistema de Autenticação

- Login/Registro de usuários
- Recuperação de senha
- Autenticação baseada em JWT
- Proteção de rotas
- Gestão de sessões seguras
- Sistema de clínicas multi-tenant

### Dashboard

- Visão geral dos agendamentos recentes
- Indicadores visuais de status (Hoje/Futuro/Realizado)
- Cards informativos com métricas importantes
- Interface responsiva e intuitiva

### Gestão de Pacientes

- Cadastro completo de pacientes
- Listagem com busca e filtros
- Histórico de consultas
- Informações de contato

### Gestão de Médicos

- Cadastro de profissionais
- Especialidades médicas
- Controle de disponibilidade
- Perfis detalhados

### Sistema de Agendamentos

- Agendamento de consultas
- Visualização de agenda
- Status de consultas
- Notificações automáticas

### Planos e Assinaturas

- Visualização de planos disponíveis
- Upgrade de assinatura
- Controle de recursos por plano
- Interface de pagamento

## Padrões de Desenvolvimento

### Conventional Commits

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para mensagens de commit, o que facilita a leitura do histórico de alterações e a geração automática de changelogs.

Estrutura básica:

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé(s) opcional(is)]
```

Tipos comuns:

- `feat`: Uma nova funcionalidade
- `fix`: Correção de um bug
- `docs`: Alterações na documentação
- `style`: Formatação, ponto e vírgula faltando, etc; Sem alteração de código
- `refactor`: Refatoração de código
- `test`: Adicionando testes
- `chore`: Atualizações de tarefas de build, configurações, etc; Sem alteração de código

## Instruções para Desenvolvimento

### Adicionando Componentes UI

Este projeto utiliza [shadcn/ui](https://ui.shadcn.com/) para componentes reutilizáveis. Para adicionar novos componentes:

```bash
npx shadcn-ui@latest add [nome-do-componente]
```

### Estilização e Temas

O projeto utiliza o sistema de temas do shadcn/ui. Os temas podem ser visualizados e customizados em: https://ui.shadcn.com/themes

### Service Layer Pattern

Para manter a qualidade e organização do código, sempre utilize os services para operações de banco de dados:

```typescript
// ❌ Não faça - Query direta no componente
const appointments = await db.query.appointments.findMany({...});

// ✅ Faça - Use o service apropriado
const appointments = await AppointmentsService.getRecentAppointments(clinicId);
```

### Tratamento de Erros

Implemente sempre tratamento de erro adequado nos services:

```typescript
try {
  const result = await SomeService.operation();
  return result;
} catch (error) {
  console.error("Error in operation:", error);
  throw new Error("Failed to complete operation");
}
```

## Licença

Este projeto é privado e não possui licença para distribuição.
