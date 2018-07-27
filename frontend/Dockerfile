FROM node:8
ADD . /home/website
COPY . /home/website
WORKDIR /home/website
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -y nodejs
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn
RUN yarn add react-select@next
RUN npm i -g react react-dom react-router-dom react-scripts reactstrap react-highlight react-highlight-words ajv --save