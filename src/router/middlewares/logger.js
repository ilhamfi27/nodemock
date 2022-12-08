const expressPino = require('express-pino-logger');

exports.expressPinoLogger = expressPino({
  level: process.env.NODE_ENV === 'development' ? 'warn' : 'info',
  enabled: true,
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
});
