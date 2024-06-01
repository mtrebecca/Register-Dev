#
FROM node:14

#
WORKDIR /usr/src/app

# Copia o package.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

COPY . .

# Porta
EXPOSE 3002

# Iniciar backend
CMD ["npm", "start"]
