FROM node:18-alpine3.16
WORKDIR /usr/src/app
COPY package*.json ./

ENV NODE_ENV=production
RUN npm ci --omit=dev  --verbose

COPY . .
EXPOSE 8000

CMD ["npm", "start"]
