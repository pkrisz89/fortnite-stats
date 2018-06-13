const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');

const schema = require('./schema/schema');
const setupApiRoutes = require('./middlewares/api');
const logger = require('./logger');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.HTTP_PORT = process.env.HTTP_PORT || 3000;
process.env.MONGO_URL = process.env.MONGO_URL || 'mongodb://fortniteguy:Abc123456@ds237489.mlab.com:37489/fortnitefriends';

function onUnhandledError(err) {
  try {
    logger.error(err);
  } catch (e) {
    console.log('LOGGER ERROR:', e); //eslint-disable-line no-console
    console.log('APPLICATION ERROR:', err); //eslint-disable-line no-console
  }
  process.exit(1);
}

process.on('unhandledRejection', onUnhandledError);
process.on('uncaughtException', onUnhandledError);

const setupAppRoutes = process.env.NODE_ENV === 'development'
  ? require('./middlewares/development')
  : require('./middlewares/production');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose
  .connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use('/graphql', expressGraphQL({schema, graphiql: true}));

app.set('env', process.env.NODE_ENV);
logger.info(`Application env: ${process.env.NODE_ENV}`);

app.use(logger.expressMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
  key: 'user_sid',
  secret: 'S3Cr3tK3y',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: 604800000 // 1 week
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {

    res.clearCookie('user_sid');
  }
  next();
});

// application routes
setupApiRoutes(app);
setupAppRoutes(app);

http
  .createServer(app)
  .listen(process.env.HTTP_PORT, () => {
    logger.info(`HTTP server is now running on http://localhost:${process.env.HTTP_PORT}`);
  });
