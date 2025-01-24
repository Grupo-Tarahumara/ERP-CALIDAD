FROM node:18

WORKDIR /app

ENV PORT=5173

COPY package*.json ./

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependencias usando pnpm
RUN pnpm install

COPY . .

# Usar la variable de entorno PORT correctamente en EXPOSE
EXPOSE $PORT

# Iniciar el servidor con pnpm
CMD ["pnpm", "dev"]

