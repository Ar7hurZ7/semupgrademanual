# Use uma imagem base oficial do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Expõe a porta que o app usará
EXPOSE 8080

# Comando para iniciar o app
CMD ["npm", "start"]
