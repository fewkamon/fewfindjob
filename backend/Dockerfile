FROM node                         
WORKDIR /usr/src/app               
COPY . .            
RUN npm install --global pm2
RUN npm install        
RUN npm rebuild bcrypt --build-from-source            
RUN npx prisma generate             
RUN yarn build      
RUN chown -R node:node /usr/src/app
USER node
EXPOSE 5000
CMD ["pm2-runtime", "start", "npm", "--", "start"]
