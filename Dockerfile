FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm serve


COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]