## Dockerfile for building production image.
## Consider replacing below rolling tag by a digest or a immutable tag
FROM bitnami/express:latest
LABEL maintainer "Bulent Morten <bulent@btegitim.com>"

ENV DISABLE_WELCOME_MESSAGE=1


ENV NODE_ENV=development \
    PORT=3000

# Skip fetching dependencies and database migrations for production image
ENV SKIP_DB_WAIT=0 \
    SKIP_DB_MIGRATION=1 \
    SKIP_NPM_INSTALL=1 \
    SKIP_BOWER_INSTALL=1

COPY . /app
WORKDIR /app

RUN npm install

EXPOSE ${PORT}
CMD ["npm", "run", "develop"]
