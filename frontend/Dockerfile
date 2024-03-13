FROM node                         

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN yarn install --force

COPY ./ ./

RUN yarn build

USER node

CMD [ "pm2-runtime", "yarn", "--", "start" ]