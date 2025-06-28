FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json* ./
COPY yarn.lock* ./

RUN npm install --legacy-peer-deps || yarn install || true

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
