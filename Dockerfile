FROM node:18

WORKDIR /app

COPY package*.json ./

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependencias usando pnpm
RUN pnpm install

COPY . .

# Iniciar el servidor con pnpm
CMD ["pnpm", "dev"]

