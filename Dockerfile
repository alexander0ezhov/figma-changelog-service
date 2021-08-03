FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
ENV MODE=production
ENV HOST=host.docker.internal
ENTRYPOINT ["node", "index.js"]