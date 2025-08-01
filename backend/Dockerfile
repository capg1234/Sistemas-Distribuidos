# Imagen base oficial de Node.js
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración primero (para aprovechar cache)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto en el que corre el backend
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
