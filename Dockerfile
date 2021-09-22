FROM node:latest as deps

RUN mkdir /app

WORKDIR /app

COPY package.json package-lock.json /app/

# use internal NPM mirror to install NPM packages
RUN npm install --registry=https://nexus.apps.dev.csd.tuwien.ac.at/repository/npm-registry-proxy/

COPY . /app

# angular-cli is installed locally, thus we point PATH to its binary folder
ENV PATH="$PATH:/app/node_modules/@angular/cli/bin/"

RUN ng build

ARG APP=damap-frontend

FROM default-route-openshift-image-registry.apps.dev.csd.tuwien.ac.at/csd-ops-images-add-nginx-baseimage/nginx:2021.32 as runner

COPY --from=deps --chown=1001:0 /app/dist/dmap-frontend/* /opt/app-root/src/webapp/

