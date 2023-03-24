FROM node:lts-alpine
ENV NODE_ENV=production
ENV PORT=8000
ENV ATLAS_URI=mongodb+srv://wap-xzbori20:xi6v3MTENiOMgme2@xzbori20-wap-cluster.0uqgb0b.mongodb.net/?retryWrites=true&w=majority
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
