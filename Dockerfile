FROM node:18.18.0

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install  app dependencies
COPY package.json /app/package.json

RUN cat /app/package.json
RUN npm cache clean -f
RUN npm install


# add app
COPY . /app


RUN npm run docs:build
CMD npm run docs

