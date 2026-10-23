<img width="1355" height="609" alt="painel de missoes" src="https://github.com/user-attachments/assets/48a201fa-17c2-4922-ac20-3ac0ff119431" />

# TaskFlow: Quest Log Edition 🎮

O **TaskFlow** é um gerenciador de tarefas Full Stack que transforma a organização diária em uma interface de "Quest Log" (diário de missões) inspirada em RPGs clássicos de 8-bits. Este projeto foi desenvolvido para consolidar conceitos fundamentais de desenvolvimento de software, integração de banco de dados e UX temática.

## Tecnologias e Ferramentas
- **Frontend:** HTML5, CSS3 (com fontes pixel art e cursores customizados) e JavaScript Vanilla.
- **Backend:** Node.js com Framework Express.
- **ORM:** Prisma (Object-Relational Mapping).
- **Banco de Dados:** PostgreSQL hospedado no Supabase.
- **Versionamento:** Git & GitHub.

## O que foi implementado
- **Operações CRUD Completas:** Criação, leitura, atualização (toggle de status e edição de texto) e exclusão de tarefas diretamente no banco de dados.
- **Filtros Dinâmicos:** Sistema de filtragem para visualizar missões por categoria (Todas, Pendentes e Concluídas).
- **Interface Temática:** Estilização baseada em jogos, incluindo feedback visual de cores para diferentes estados de missão e cursores personalizados.

## Desafios superados
Durante o desenvolvimento, enfrentei desafios reais que simulam o dia a dia de um desenvolvedor:
1. **Modelagem de Dados e Integração:** Configurar o Prisma para se comunicar com o PostgreSQL e garantir que a tipagem dos dados entre o Front e o Back estivesse correta.
2. **Sincronização Assíncrona:** Gerenciar chamadas de API (`fetch`, `async/await`) para garantir que a interface refletisse o banco de dados em tempo real, sem travamentos.
3. **Resolução de Conflitos de Ambiente:** Debugar erros de rotas e divergências de nomenclatura entre o modelo do banco e as requisições da API.
4. **Deploy e Configuração de Terminal:** Superar obstáculos na configuração do Git e na organização de pastas para um deploy organizado e profissional.

## Como rodar

Pré-requisitos: Node.js 18+ e um banco PostgreSQL (o projeto usa o Supabase, que tem plano grátis).

```bash
cd backend
cp .env.example .env      # coloque a sua DATABASE_URL
npm install               # também gera o Prisma Client
npx prisma db push        # cria a tabela "tarefas" no banco
npm run dev               # API em http://localhost:3000
```

Depois abra `frontend/index.html` no navegador. As rotas podem ser testadas pelo arquivo `backend/api.http` (extensão REST Client do VS Code).

## API

| Método | Rota | O que faz |
|---|---|---|
| GET | `/tarefas` | Lista as missões, da mais nova para a mais antiga |
| POST | `/tarefas` | Cria uma missão (`{ "titulo": "..." }`) |
| PATCH | `/tarefas/:id` | Com `titulo`, renomeia; sem corpo, alterna pendente/concluído |
| DELETE | `/tarefas/:id` | Exclui a missão |
