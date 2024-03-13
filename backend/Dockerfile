FROM node                         
WORKDIR /usr/src/app               
COPY . .            
RUN npm install --global pm2
RUN npm install        
RUN npm rebuild bcrypt --build-from-source            
RUN npx prisma generate             
RUN yarn build      
USER node
CMD [ "pm2-runtime", "npm", "--", "start" ]