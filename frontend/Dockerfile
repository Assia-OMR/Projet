# Étape 1 : build de l'app React avec Vite
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : servir avec nginx
FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

# Configuration Nginx (optionnelle si tu veux personnaliser)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
