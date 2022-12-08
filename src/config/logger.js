const pino = require('pino');

exports.logger = pino({
  name: process.env.APP_NAME || 'NodeMock',
  level: process.env.NODE_ENV === 'development' ? 'warn' : 'info',
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
});
