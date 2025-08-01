# Imagen base para construir la aplicación React
FROM node:18 as build

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación React
RUN npm run build

# Etapa final - Servir los archivos con Nginx
FROM nginx:alpine

# Copiar archivos de build a la carpeta de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto por defecto de Nginx
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
