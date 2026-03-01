# LootForge

Projeto de estudo em Angular com apresentacao de portifolio, usando como tema uma loja gamer para venda de itens digitais, boosts, contas e moedas para jogos.

O foco foi praticar construcao de interface, organizacao visual, renderizacao dinamica e regras basicas de acesso, mas em um contexto com cara de produto real.

## Sobre o Projeto

O LootForge foi pensado como um estudo pratico de frontend:

- interface inspirada em uma home comercial
- experiencia visual voltada para games
- fluxo de acesso com perfil de usuario e administrador
- exibicao de produtos, relatorios e conteudo dinamico

Mesmo sendo um projeto de estudo, a proposta foi montar algo apresentavel, com estrutura visual de portifolio e com funcionalidades que simulam um caso de uso real.

## Destaques

- Home responsiva com layout moderno e foco visual em conversao
- Cards de produtos com imagens reais
- Modal inicial com jogos em alta
- Secao de videos com embeds do YouTube
- Cadastro e login com persistencia local
- Contas de teste para usuario e administrador
- Relatorios de vendas, procura e cadastro
- Controle de acesso para recursos administrativos

## Objetivos de Estudo

Este projeto foi usado para praticar:

- Angular 20 com componentes standalone
- Templates com `@if` e `@for`
- Formularios com `ngModel`
- Gerenciamento simples de sessao com `localStorage`
- Estruturacao de interface com SCSS
- Separacao entre areas publicas e area administrativa

## Tecnologias Utilizadas

- Angular 20
- TypeScript
- SCSS
- HTML

## Funcionalidades

### Area publica

- Vitrine de produtos com nome, preco, entrega e imagem
- Secoes de categorias, videos e destaques
- Modal com jogos mais jogados do momento

### Acesso e perfil

- Cadastro de novas contas
- Login com validacao basica
- Persistencia de contas e sessao no navegador
- Logout com ocultacao de areas restritas

### Area administrativa

- Visualizacao de relatorios de vendas
- Visualizacao de relatorios de procura
- Visualizacao de metricas de cadastro

## Contas de Teste

Administrador:

- E-mail: `admin@lootforge.test`
- Senha: `Admin@123`

Usuario:

- E-mail: `usuario@lootforge.test`
- Senha: `User@123`

## Como Executar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor local:

```bash
ng serve
```

Abra no navegador:

```bash
http://localhost:4200/
```

## Build

Para gerar a versao de producao:

```bash
ng build
```

Saida:

```bash
dist/game-loot-store
```

## Testes

Para executar os testes:

```bash
ng test
```

## Estrutura Principal

- `src/app/app.ts`: logica principal da aplicacao
- `src/app/app.html`: estrutura da interface
- `src/app/app.scss`: estilos da pagina
- `public/products/`: imagens usadas nos cards de produtos

## Contexto de Estudo

Este projeto nao usa backend real para autenticacao.

Atualmente:

- os dados de conta ficam no `localStorage`
- a sessao e controlada no frontend
- os relatorios usam dados simulados combinados com dados locais

Ou seja: ele foi construido para estudo, demonstracao e portifolio, nao como sistema pronto para producao.

## Repositorio

GitHub:

```bash
https://github.com/Becero/game-loot-store
```
