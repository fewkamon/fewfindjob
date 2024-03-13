FROM node                         
WORKDIR /usr/src/app               
COPY . .                           
RUN yarn install
RUN yarn add sharp --ignore-engines  
RUN npx prisma generate             
RUN yarn build                     
CMD ["npm", "run","start:prod"]