import appRoot from 'app-root-path';
import winston from 'winston';
import moment from 'moment';

const tsFormat = () => moment().format('YYYY-MM-DD HH:mm:ss').trim();
const logNameFormat = () => moment().format('YYYY-MM-DD').trim();

const options = {
  file: {
    filename: `${appRoot}/log/${logNameFormat()}_.log`,
    json: false,
    maxsize: '1000000‬',
    maxFiles: '10',
    tailable: true,
  },
};

const { combine, timestamp, label, printf } = winston.format;
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File(options.file),
  ],
  format: combine(
    label({ label: 'grades-control-api' }),
    timestamp({ format: tsFormat }),
    logFormat
  ),
});
