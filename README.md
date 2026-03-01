# Estudos de Angular | LootForge

Este projeto foi desenvolvido como um estudo prático em Angular, usando como tema uma loja gamer para venda de itens digitais, contas, boosts e conteúdos relacionados a jogos.

A proposta foi unir prática de frontend com uma interface inspirada em um cenário real de vendas, trabalhando tanto a parte visual quanto regras de acesso, organização de conteúdo e renderização dinâmica.

## Objetivo do Projeto

Este projeto serve como base de estudo para:

- construção de interfaces em Angular
- uso de templates dinâmicos com `@if` e `@for`
- manipulação de formulários com `ngModel`
- controle de sessão no frontend com `localStorage`
- organização visual com SCSS
- criação de uma home com proposta comercial

## Visão Geral da Aplicação

O site simula uma loja gamer com foco em venda de:

- gold
- boosts
- contas
- moedas digitais
- ofertas para jogos como World of Warcraft, Diablo IV, League of Legends e Counter-Strike 2

Além da vitrine de vendas, o projeto também foi usado para praticar funcionalidades comuns em aplicações web.

## O Que Foi Implementado

Atualmente, o projeto possui:

- home com layout moderno, simples e responsivo
- vitrine de produtos com imagens reais
- modal inicial com jogos em destaque
- seção com vídeos de MMOs
- sistema de cadastro e login para testes
- contas de teste para administrador e usuário
- relatórios de vendas, procura e cadastro
- bloqueio de relatórios apenas para administrador

## Tecnologias Utilizadas

- Angular 20
- TypeScript
- SCSS
- HTML

## Como Executar o Projeto

Instale as dependências:

```bash
npm install
```

Inicie o servidor local:

```bash
ng serve
```

Depois acesse:

```bash
http://localhost:4200/
```

## Build

Para gerar a versão de produção:

```bash
ng build
```

O resultado será gerado em:

```bash
dist/game-loot-store
```

## Testes

Para rodar os testes:

```bash
ng test
```

## Contas de Teste

Administrador:

- E-mail: `admin@lootforge.test`
- Senha: `Admin@123`

Usuário:

- E-mail: `usuario@lootforge.test`
- Senha: `User@123`

## Regras de Acesso

- usuários comuns podem navegar pela loja e usar o sistema de acesso
- relatórios e métricas administrativas aparecem apenas para administrador
- ao sair da conta, áreas restritas deixam de ser exibidas

## Observação Importante

O sistema de login atual foi criado para fins de estudo e demonstração no frontend.

Isso significa que:

- os dados ficam salvos localmente no navegador
- não existe backend real de autenticação
- não é um sistema pronto para produção

## Estrutura Principal

- `src/app/app.ts`: lógica principal da aplicação
- `src/app/app.html`: estrutura da interface
- `src/app/app.scss`: estilos da página
- `public/products/`: imagens dos produtos

## Repositório

GitHub:

```bash
https://github.com/Becero/game-loot-store
```
