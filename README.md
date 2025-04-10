# Hello Store - Projeto de CRUD com React, Node.js, Express e MySQL

Este projeto foi desenvolvido como parte da disciplina de Experiência Criativa. O objetivo é construir uma aplicação completa com CRUD (Create, Read, Update, Delete), integrando frontend em React, backend em Node.js + Express, e um banco de dados MySQL.

Tema:
A aplicação é inspirada no universo da Hello Kitty e seus amigos, com cores suaves em tons de rosa e roxo pastel.

- Estrutura do Projeto

hello-store/
├── backend/             # Servidor Node.js com Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── db.js
│   └── server.js
├── frontend/            # Aplicação React com Material UI
│   ├── public/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── App.js
│       └── index.js
├── banco_hello_store.sql
└── README.md

- Como Rodar o Projeto:

1. Clone o repositório

git clone https://github.com/DessaSouza/hello-store-exp-crativa.git
cd hello-store-exp-crativa

2. Configure o Banco de Dados

- Importe o arquivo banco_hello_store.sql no seu MySQL.
- Crie um banco chamado hello_store se necessário.

3. Backend

cd backend
npm install
npm start

O backend rodará em: http://localhost:3000

4. Frontend

cd frontend
npm install
npm start

O frontend rodará em: http://localhost:3001

- Funcionalidades

✔Listagem de produtos com paginação  
✔Cadastro, edição e exclusão de produtos  
✔Visualização detalhada de cada item  
✔Integração completa com API  
✔Estilização com Material UI 

- Vídeo de Apresentação

- O vídeo de apresentação do projeto está incluído na pasta da entrega (/apresentacao) ou conforme enviado no AVA.

Desenvolvido por:

Andressa Aparecida Teixeira de Souza

Projeto acadêmico - uso livre para fins educacionais.
