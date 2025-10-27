# Barber Store

Aplicação web para gerenciamento de barbearia (agendamentos, serviços, clientes e agenda).

Protótipo de interface:  
[Figma - FSW Barber](https://www.figma.com/file/TJquYVeL0si5dpXxJNtPkM/FSW-Barber-%5BLive%5D?type=design&node-id=0%3A1&mode=design&t=g9xaSpJL29lajU5D-1)

## Tecnologias
- Next.js (React)
- TypeScript
- Prisma (ORM)
- PostgreSQL
- Supabase
- TailwindCSS

## Funcionalidades principais
- Cadastro e autenticação de usuários (via Supabase)
- Gestão de serviços oferecidos pela barbearia
- Agendamento de horários
- Painel administrativo para visualizar/agendar/editar compromissos
- Layout responsivo (mobile-first)

## Requisitos
- Node.js >= 18
- npm, yarn ou pnpm
- PostgreSQL (local ou hospedado)
- Conta e projeto no Supabase (se for usar recursos do Supabase)

## Variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e defina pelo menos as variáveis abaixo (nomes sugeridos — ajuste conforme seu código):

- DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
- NEXT_PUBLIC_SUPABASE_URL="https://<your-project>.supabase.co"
- NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"
- SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"  # usado apenas no servidor, se necessário
- NEXT_PUBLIC_APP_URL="http://localhost:3000"     # ou a URL da aplicação

Atenção: não versionar o `.env` que contenha chaves sensíveis.

## Instalação e execução (desenvolvimento)
1. Clone o repositório:
   ```bash
   git clone https://github.com/eullergomes/barber_store.git
   cd barber_store
   ```

2. Instale dependências:
   ```bash
   npm install
   # ou
   # yarn
   # pnpm install
   ```

3. Configure as variáveis de ambiente no `.env`.

4. Prepare o banco de dados com Prisma:
   - Gerar/atualizar o cliente Prisma:
     ```bash
     npx prisma generate
     ```
   - Executar migrações (se houver):
     ```bash
     npx prisma migrate dev --name init
     ```
   - Ou empurrar o schema direto:
     ```bash
     npx prisma db push
     ```
   - Abrir o Prisma Studio (opcional):
     ```bash
     npx prisma studio
     ```

5. Executar a aplicação em modo desenvolvimento:
   ```bash
   npm run dev
   # normalmente disponível em http://localhost:3000
   ```

## Build e produção
- Gerar build:
  ```bash
  npm run build
  ```
- Iniciar servidor:
  ```bash
  npm start
  # ou
  npm run start
  ```

Observação: para produção, ajuste as variáveis de ambiente e o provedor de banco (ex.: Supabase, Railway, Heroku, PlanetScale, Vercel com banco externo).

## Integração com Supabase
Se a aplicação utiliza Supabase para autenticação ou armazenamento, crie um projeto no painel Supabase e copie as chaves:
- URL do projeto -> NEXT_PUBLIC_SUPABASE_URL
- Chave anônima -> NEXT_PUBLIC_SUPABASE_ANON_KEY
- Service Role Key (apenas no backend) -> SUPABASE_SERVICE_ROLE_KEY

Verifique os policies (RLS) e rules do Supabase conforme sua modelagem de segurança.

## Contribuição
Contribuições são bem-vindas! Siga estes passos:
1. Fork do repositório
2. Crie uma branch com sua feature: `git checkout -b feat/nova-feature`
3. Commit e push: `git commit -m "descrição"` e `git push origin feat/nova-feature`
4. Abra um Pull Request descrevendo sua alteração

Por favor, inclua descrições claras e, quando aplicável, screenshots ou referência ao protótipo Figma.

## Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para detalhes (se presente).

## Contato
Mantedor: eullergomes  
Email/GitHub: https://github.com/eullergomes

Boa sorte com o desenvolvimento! Se quiser, posso gerar um modelo de .env.example, adicionar um script de seed para o Prisma, ou criar um template de GitHub Actions para CI.````
