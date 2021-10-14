FROM default-route-openshift-image-registry.apps.dev.csd.tuwien.ac.at/csd-images/nodejs:12 as deps

COPY package.json package-lock.json /app/

# use internal NPM mirror to install NPM packages
RUN npm install

COPY . /app

# angular-cli is installed locally, thus we point PATH to its binary folder
ENV PATH="$PATH:/app/node_modules/@angular/cli/bin/"

RUN ng build

ARG APP=damap-frontend

FROM default-route-openshift-image-registry.apps.dev.csd.tuwien.ac.at/csd-images/nginx:2021.32 as runner

COPY --from=deps --chown=1001:0 /app/dist/damap-frontend/* /opt/app-root/src/webapp/


