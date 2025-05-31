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

### Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run start` - Inicia o servidor em modo de produção
- `npm run lint` - Executa o linter para verificar o código

### Banco de Dados (Drizzle ORM)

Para gerenciar o banco de dados PostgreSQL, o projeto utiliza Drizzle ORM:

- `npx drizzle-kit push:pg` - Atualiza o esquema do banco de dados
- `npx drizzle-kit studio` - Interface visual para gerenciar o banco de dados
- `https://console.neon.tech/app/projects` - Console banco de dados Neon

## Estrutura do Projeto

```
doutor-agenda/
├── actions/          # Server actions type-safe com Next Safe Action
├── app/              # Aplicação Next.js e rotas da aplicação
│   ├── (auth)/       # Rotas de autenticação (login, registro, etc.)
│   ├── (dashboard)/  # Área restrita do sistema após login
│   ├── api/          # Rotas de API
│   └── layout.tsx    # Layout principal da aplicação
├── components/       # Componentes React reutilizáveis
│   ├── ui/           # Componentes de UI do shadcn
│   ├── forms/        # Componentes de formulário
│   └── shared/       # Componentes compartilhados
├── config/           # Arquivos de configuração
├── db/               # Configuração do Drizzle ORM e esquemas
│   ├── migrations/   # Migrações do banco de dados
│   ├── schema/       # Definição dos esquemas das tabelas
│   └── index.ts      # Configuração de conexão
├── emails/           # Templates de emails
├── hooks/            # Custom hooks React
├── lib/              # Utilitários e funções auxiliares
├── middleware.ts     # Middleware Next.js para proteção de rotas
├── providers/        # Providers React (temas, autenticação)
├── public/           # Arquivos estáticos
├── schemas/          # Esquemas de validação Zod
├── styles/           # Estilos globais
└── types/            # Definições de tipos TypeScript
```

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

## Licença

Este projeto é privado e não possui licença para distribuição.
