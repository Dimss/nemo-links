FROM node
WORKDIR /nemo-links
ADD app /nemo-links/app
COPY app.js /nemo-links
COPY package.json /nemo-links
RUN npm install
CMD npm start

