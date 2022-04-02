'use strict';

const { createLogger, transports, format } = require('winston');
const { combine, timestamp, colorize, json, simple, printf, label } = format;

//Log print
const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

//Log config
const printLogFormat = {
  file: combine(
    label({
      label: 'label test ...',
    }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:dd',
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

const options = {
  file: new transports.File({
    dirname: './logs',
    filename: 'info.log',
    level: 'info',
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: 'info',
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [options.file],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(options.console);
}
module.exports = logger;
