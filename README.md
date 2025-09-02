# My Node.js App

Este projeto é uma aplicação Node.js utilizando TypeScript, Express, Jest, PostgreSQL e dotenv. Abaixo estão as instruções para instalação e uso.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd my-nodejs-app
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e defina a variável `APP_PORT`:
   ```
   APP_PORT=3000
   ```

## Estrutura do Projeto

```
my-nodejs-app
├── src
│   ├── app.ts          # Configuração da aplicação Express
│   ├── index.ts        # Ponto de entrada da aplicação
│   └── routes
│       └── index.ts    # Definição das rotas da aplicação
├── .env                # Variáveis de ambiente
├── .gitignore          # Arquivos e pastas a serem ignorados pelo Git
├── babel.config.js     # Configuração do Babel
├── jest.config.js      # Configuração do Jest
├── package.json        # Configuração do npm
├── tsconfig.json       # Configuração do TypeScript
└── README.md           # Documentação do projeto
```

## Uso

Para iniciar a aplicação, execute o seguinte comando:
```
npm run dev
```

Para construir a aplicação, execute:
```
npm run build
```

Para executar a aplicação construída, use:
```
npm start
```

## Testes

Para rodar os testes, utilize:
```
npm test
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.