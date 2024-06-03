# 📋 Niveis/Desenvolvedores SPA

## 📝 Descrição

Projeto é uma aplicação de página única (SPA) para listagem e cadastro de níveis e desenvolvedores. Ele utiliza uma arquitetura frontend/backend com React no frontend e Node.js no backend. A aplicação permite criar, editar e excluir níveis de desenvolvedores, além de visualizar uma lista paginada e ordenada dos níveis.

## 🚀 Tecnologias Utilizadas

### Frontend

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Router DOM**: Navegação entre páginas no React.
- **Axios**: Cliente HTTP para fazer requisições à API.
- **SweetAlert2**: Para mostrar alertas bonitos e responsivos.
- **TailwindCSS**: Framework CSS para estilização rápida e responsiva.

### Backend

- **Node.js**: Ambiente de execução JavaScript server-side.
- **Express**: Framework para Node.js que facilita a criação de APIs REST.
- **Cors**: Middleware para permitir requisições cross-origin.

### Ferramentas de Desenvolvimento

- **ESLint**: Ferramenta de linting para manter o código limpo e consistente.
- **Docker**: Ferramenta para criar contêineres, garantindo que o ambiente de desenvolvimento seja o mesmo em qualquer lugar.

## 🛠️ Configuração do Projeto

### Pré-requisitos

- **Docker** e **Docker Compose** instalados na máquina.
- **Node.js** instalado (opcional, caso deseje rodar fora do Docker).

## 🔧 Comandos

Configuração do Docker Compose
O arquivo docker-compose.yml configura os serviços do frontend e backend, para rodar a aplicação com Docker, é necessário

    construir e subir os contêineres:

        * docker-compose up --build *

    Acessar a aplicação:

    Frontend: http://localhost:3000
    Backend: http://localhost:3002

## 🏗️ Rodar a Aplicação Localmente

Instalar as dependências:

Backend:
    - cd backend
    - npm install
    - npm start

Frontend:
    - cd frontend
    - npm install
    - npm start

Acessar a aplicação: http://localhost:3000
