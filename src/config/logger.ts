import winston from 'winston';
import 'winston-mongodb';

const { label } = winston.format;

const { createLogger, format } = winston;

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const transports: any = winston.transports;

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: 'info',
      db: process.env.MONGODB,
      collection: 'logs',
      capped: true,
      cappedMax: 20,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: format.combine(
    label({ label: '3lm-api' }),
    format.timestamp(),
    myFormat,
  ),
});

export { logger };
