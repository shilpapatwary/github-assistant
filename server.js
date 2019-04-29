const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
const swaggerDocument = YAML.load('./swagger/apps-openapi.yml');
const dotenv = require("dotenv");

const jwtAuth = require('./util/authenticate');
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const channelsRouter = require('./routes/channels');
const usersRouter = require('./routes/userChannels');
const gitbotRouter = require('./routes/gitbot');
const compression = require('compression')

require('./config/dbConnection');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

dotenv.config();
const port = process.env.PORT || 5000;
const redisOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  };
  const corsOptions = {
    origin: 'http://localhost:5000'
  }
  app.use(compression());
  app.use(express.static(path.join(__dirname, "UI/github-assistant", "build")));

  app.use(cors(corsOptions));
  app.use(morgan('dev'));
  app.use(bodyparser.urlencoded({
    extended: true,
  }));
  app.use(bodyparser.json());
  app.use(cookieSession({
    store: new RedisStore(redisOptions),
    secret: 'shilpa',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }));
  app.use(cookieParser());
  app.use(jwtAuth.initialize());
  app.use('/', homeRouter);
  app.use('/auth', authRouter);
  app.use('/api/gitbot', jwtAuth.authenticate('jwt', { session: false }), gitbotRouter);
   app.use('/api/channels', jwtAuth.authenticate('jwt', { session: false }), channelsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  

  
  app.use((err, req, res, next) => {
    if (err) res.set(500).send('Some error occured, Please try again later!');
    next();
  });
  app.use((req, res) => {
    res.set(404).send('REQUEST NOT FOUND');
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "UI/github-assistant", "build", "index.html"));
  });

  server.listen(port);
  io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat', (data) => {
       io.emit('chat', data);
    });
    socket.on('channel', (data) => {
      io.emit('channel', data);
    });
    socket.on('userChannel', (data) => {
      io.emit('userChannel', data);
    });

  });
  module.exports = app;