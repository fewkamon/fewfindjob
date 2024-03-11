FROM node                         

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN npm install --force

COPY ./ ./

RUN npm run build

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]