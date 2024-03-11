FROM node                         
WORKDIR /usr/src/app               
COPY . .                           
RUN npm install        
RUN npm rebuild bcrypt --build-from-source            
RUN npx prisma generate             
RUN yarn build                     
EXPOSE 5000                        
CMD ["npm", "run","start:prod"]