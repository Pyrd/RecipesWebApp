FROM node:14 AS builder

ARG BACKEND_BASEURL
ENV BACKEND_BASEURL ${BACKEND_BASEURL}

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build

FROM node:14-alpine

WORKDIR /app
COPY --from=builder /app ./

ENV HOST 0.0.0.0
ENV NODE_ENV production
ENV BACKEND_BASEURL ${BACKEND_BASEURL}

CMD ["yarn", "start"]