FROM node:18-alpine

WORKDIR /home/danluki/Projects/js/shgpu-table/apps/parser/

COPY package*.json ./
COPY tsconfig*.json ./

COPY /home/danluki/Projects/js/shgpu-table/apps/parser/src /home/danluki/Projects/js/shgpu-table/apps/parser/src

RUN npm install
RUN npm run build

CMD ["node", "./dist/index.js"]

