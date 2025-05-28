FROM node:18-alpine AS build
# Étape 1 : build de l'app React avec Vite
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .
# Tu peux faire un test ici (ex: npm run lint/test)

# installe dotenv si tu utilises un fichier .env
RUN npm install dotenv

# Étape 2 : Image finale pour exécution
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 5174
# 
CMD ["npm", "run", "dev"]
