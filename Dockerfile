FROM node:lts AS build
WORKDIR /build

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:lts-alpine
WORKDIR /app

COPY --from=build /build/.svelte-kit/adapter-node /app

CMD ["node", "index.js"]