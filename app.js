const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/route/route');
const middlewares = require('./app/common/middlewares');
const log = require('./app/common/logger').logger;
const conf = require('./app/configs/conf').conf;
const app = express();
const router = express.Router();
const mongoose = require('mongoose');


const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }


// mongoose.connect(conf.db);
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(conf.db, options).then(()=>{
      console.log('MongoDB is connected')
    }).catch(err=>{
      console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
      setTimeout(connectWithRetry, 5000)
    })
  }
  
connectWithRetry()

app.use(middlewares.requestInitializerMiddleware);
app.use(bodyParser.json());
routes(router);
app.use('/', router);
// Default handler to send JSON responses to the client
app.use(middlewares.responseSenderMiddleware);
// Default error handler
app.use(middlewares.errorHandlerMiddleware);
app.listen(conf.listenPort, '0.0.0.0', () => log.info(`Nemo links API listening on port ${conf.listenPort}`));
log.info(`Runtime profile: ${process.env.PROFILE}`);