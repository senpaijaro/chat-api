const winston = require('winston')
const { format } = require('winston')
const expressWinston = require('express-winston');

module.exports.logger =  winston.createLogger({
  transports: [
      new winston.transports.Console({
        format: format.combine(
          winston.format.colorize({
            all: true
          }),
          winston.format.label({
            label:'[LOGGER]'
          }),
          winston.format.timestamp({
              format:"YY-MM-DD HH:MM:SS"
          }),
          winston.format.printf(
              info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
          )
         
        ),
      })
  ]
});

module.exports.request = expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
})

module.exports.error =  expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
})
