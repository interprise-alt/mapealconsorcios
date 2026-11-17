# Mapeal — Consultoria em Negócios, Investimentos e Consórcios

Site institucional e simulador comparativo de consórcios e investimentos da **Mapeal** (Marcos Pedro Alves), em parceria com a **NS Assessoria Consórcios**.

## Publicação na Render.com

O projeto já inclui o arquivo `render.yaml` configurado para **Static Site** na Render.com.

### Opção 1: Via Blueprint (`render.yaml`) — Recomendado
1. Envie este repositório para o **GitHub** ou **GitLab**.
2. Acesse o painel da [Render.com](https://dashboard.render.com/), clique em **New +** → **Blueprint**.
3. Selecione o repositório. A Render lerá automaticamente o arquivo `render.yaml` e publicará o site estático com HTTPS gratuito.

### Opção 2: Configuração Manual como Static Site
1. No painel da Render.com, clique em **New +** → **Static Site**.
2. Conecte seu repositório e preencha:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
3. Em **Redirects / Rewrites**, adicione uma regra `Rewrite`:
   - **Source**: `/*`
   - **Destination**: `/index.html`

## Desenvolvimento Local

```bash
npm install
npm run dev
```

Para gerar a versão de produção localmente:

```bash
npm run build
```
