#
FROM node:14

#
WORKDIR /usr/src/app

# Copiar o package.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

#
COPY . .

# Porta que será executado
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
