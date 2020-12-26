FROM node:14-alpine

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
