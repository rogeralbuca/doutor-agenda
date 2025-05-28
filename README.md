# Doutor Agenda

Sistema de agendamento médico desenvolvido como parte do Bootcamp Fullstack Club.

## Tecnologias

O projeto utiliza as seguintes tecnologias:

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS 4](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [shadcn/ui](https://ui.shadcn.com/) com [sistema de temas](https://ui.shadcn.com/themes)
- [Radix UI](https://www.radix-ui.com/) - Biblioteca de componentes acessíveis
- [Lucide React](https://lucide.dev/) - Biblioteca de ícones

## Autenticação

O projeto implementa um sistema de autenticação completo com:

- Login/Registro de usuários
- Recuperação de senha
- Autenticação baseada em JWT
- Proteção de rotas
- Diferentes níveis de acesso (Admin, Médico, Paciente)

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

## Estrutura do Projeto

```
doutor-agenda/
├── app/              # Aplicação Next.js
├── components/       # Componentes React reutilizáveis
├── db/               # Configuração do Drizzle ORM e esquemas
├── lib/              # Utilitários e funções auxiliares
├── providers/        # Providers React (temas, autenticação)
├── public/           # Arquivos estáticos
├── hooks/            # Custom hooks React
└── ...
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
