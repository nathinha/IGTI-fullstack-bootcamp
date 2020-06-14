import express from 'express';
import { promises as fs } from 'fs';
import { router as accountRouter } from './routes/account.js';
import winston from 'winston';

let app = express();
let port = 3000;

app.use(express.json());
app.use('/account', accountRouter);

global.gFileName = './accounts.json';
global.gFileEnc = 'utf8';

const { combine, timestamp, label, printf } = winston.format;
const logFormat = printf(({ timestamp, level, message, label }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.gLogger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), logFormat),
});

app.listen(port, async () => {
  try {
    await fs.readFile(gFileName, gFileEnc);
    gLogger.info('RESTful service started');
  } catch (err) {
    const initJson = {
      nextId: 1,
      accounts: [],
    };
    await fs.writeFile(gFileName, JSON.stringify(initJson));
    gLogger.info(`${gFileName} created`);
  }
});
