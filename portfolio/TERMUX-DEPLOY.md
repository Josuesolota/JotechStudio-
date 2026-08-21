# Deploy via Termux → GitHub → Vercel

## 0. Antes de começar
No Termux:
```bash
pkg update && pkg upgrade -y
pkg install nodejs-lts git -y
node -v   # confirme que instalou (v18+ ou v20+)
```

## 1. Extrair o projeto
```bash
cd ~/storage/downloads   # ou onde o zip foi baixado
unzip portfolio-fase1-5.zip -d ~/
cd ~/portfolio
```
Se `~/storage` não existir, rode `termux-setup-storage` primeiro (dá permissão de acesso aos arquivos do telemóvel).

## 2. Instalar dependências
```bash
npm install
```
O arquivo `.env` **já vem preenchido** com o seu Sanity Project ID (`p4qpg5fe`). Não precisa mexer nele.

## 3. (Opcional) testar localmente
```bash
npm run dev
```
Abra `http://localhost:4321` no navegador do telemóvel.

## 4. Preencher dados pessoais antes do deploy
Edite estes arquivos e troque os placeholders:
- `src/pages/contato.astro` → `WEB3FORMS_ACCESS_KEY` (crie grátis em https://web3forms.com)
- `src/pages/contato.astro` → email e link do WhatsApp
- `src/components/Footer.astro` → links de GitHub/LinkedIn e email
- `astro.config.mjs` → `SITE_URL` (pode ajustar depois que souber a URL final da Vercel)

## 5. Subir para o GitHub

### Opção A — com GitHub CLI (mais simples)
```bash
pkg install gh -y
gh auth login          # siga as instruções (login via navegador)
git init
git add .
git commit -m "Portfolio inicial: Astro + Sanity"
gh repo create portfolio --public --source=. --remote=origin --push
```

### Opção B — sem GitHub CLI
1. Crie o repositório manualmente em https://github.com/new (nome: `portfolio`, sem README)
2. No Termux:
```bash
git init
git add .
git commit -m "Portfolio inicial: Astro + Sanity"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/portfolio.git
git push -u origin main
```
Vai pedir usuário e senha do GitHub — use um **Personal Access Token** no lugar da senha (crie em github.com → Settings → Developer settings → Personal access tokens).

## 6. Conectar à Vercel
1. Acesse https://vercel.com no navegador do telemóvel e faça login (pode usar a conta GitHub)
2. **Add New → Project**
3. Selecione o repositório `portfolio`
4. A Vercel detecta Astro automaticamente — não mude nada no build command
5. Antes de clicar em Deploy, abra **Environment Variables** e adicione:
   - `SANITY_PROJECT_ID` = `p4qpg5fe`
   - `SANITY_DATASET` = `production`
6. Clique em **Deploy**

## 7. Ajustar a URL final
Depois do primeiro deploy, a Vercel te dá uma URL (ex: `portfolio-seu-usuario.vercel.app`).
1. Edite `astro.config.mjs` localmente, atualize `SITE_URL` com essa URL real
2. `git add . && git commit -m "Atualiza site URL" && git push`
3. A Vercel faz redeploy automático a cada push — não precisa fazer mais nada manualmente

## 8. Publicar projetos no Sanity Studio
Se ainda não criou o Studio (painel de administração), no computador ou até no Termux:
```bash
npm create sanity@latest -- --project portfolio-studio --dataset production --template clean --typescript
```
Copie `sanity-studio-schemas/project.ts` para dentro do Studio (`schemaTypes/project.ts`) e registre no `schemaTypes/index.ts`. Rode `npm run dev` no Studio e comece a cadastrar seus projetos — cada publicação aparece no site após o próximo build (a Vercel pode ser configurada para rebuildar automaticamente via webhook do Sanity, se quiser isso me avise que configuramos juntos).

---

## Checklist rápido
- [ ] `npm install` rodou sem erro
- [ ] Access Key do Web3Forms configurada
- [ ] Email/WhatsApp/links sociais atualizados
- [ ] Repositório no GitHub criado e com push feito
- [ ] Projeto importado na Vercel com as env vars configuradas
- [ ] `SITE_URL` atualizado após o primeiro deploy
- [ ] Pelo menos 1 projeto publicado no Sanity para testar o fluxo completo
