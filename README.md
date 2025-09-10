# Tower

Uma API REST para gerenciar uma torre de desafios onde jogadores competem para alcançar o topo do ranking. Construído com Node.js, TypeScript e PostgreSQL.

A Torre de Desafios é uma aplicação backend que simula um sistema de ranking competitivo. Quando um novo jogador é registrado, ele entra na última posição da torre. Para subir no ranking, ele deve desafiar e vencer os jogadores que estão imediatamente acima dele. O objetivo final é chegar à primeira posição e se tornar o "Rei da Torre".

## Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/gabrielknust/tower
   cd tower
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e defina as variaveis: `APP_PORT` (Porta da Aplicação), `DB_NAME` (Nome do Banco de Dados), `DB_USER`(Usuário do Banco de Dados) , `DB_HOST` (Host do Banco de Dados), `DB_PASSWORD` (Senha do Banco de Dados), `DB_PORT` (Porta do Banco de Dados).)
   ```
   APP_PORT=3000
   DB_NAME=my_database
   DB_USER=my_user
   DB_HOST=localhost
   DB_PASSWORD=my_password 
   DB_PORT=5432
   ```

## Uso

Para iniciar a aplicação é necessário construir o banco de dados:

```
node run postgres/setup.ts
```

Esse comando irá criar toda a estrutura necessária e popular o banco com dados fictícios.

Para iniciar a aplicação, execute:

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