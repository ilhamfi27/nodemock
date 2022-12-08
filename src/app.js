let express = require('express');
let cookieParser = require('cookie-parser');
let {expressPinoLogger} = require('./router/middlewares/logger');

let indexRouter = require('./router/routes');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('*', indexRouter);
app.use(expressPinoLogger);

module.exports = app;
