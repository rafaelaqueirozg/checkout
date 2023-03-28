# Desafio Web Frontend - PEBMED

**Checkout** é uma aplicação web de checkout onde um usuário poderá fazer uma assinatura anual ou mensal apresentando sucesso ou erro ao submeter o formulário, enviando as informações de pagamento para processamento pelo backend.

# 🚀 Tecnologias

- React v18
  - React Hook Form
  - React Router DOM
- Redux
- Typescript
- Axios
- Jest & Testing Library
- Vite
- ESLint, Prettier, Lint-Staged e Husky

# 📑 Conceitos e técnicas

- Expressões Regulares
- Adapter Pattern para normalizar resposta vinda da api
- Controle de estado com Redux
- Commits semânticos
  - Conventional Commits
- Testes unitários
- Validação de formulário
- Estilização com SCSS e o padrão [BEM CSS](https://getbem.com/introduction/)
- Regras de ESLint;
- Integração do Husky para:
  - garantir que todo código esteja dentro do style guide do projeto;
  - garantir que todos os testes estejam rodando;
  - garantir que a mensagem de commit esteja dentro do padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/);
- Layout mobile-friendly: adaptação de layout para telas menores

# 🤓 Como usar

Este projeto foi criado com a versão LTS do node (v18.15.0).

Sugiro fortemente que atualize sua versão para ela antes de rodar os passos abaixo. Para facilitar esse gerenciamento de versões, sugiro o uso do [NVM](https://github.com/nvm-sh/nvm);

```
# Clone este repositório
git clone git@github.com:rafaelaqueirozg/checkout.git

# Entre na pasta web
cd checkout

# Instale as dependências
npm install

# Rode o frontend
npm run dev

# O projeto rodará na porta 5173
```
