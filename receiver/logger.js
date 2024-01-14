const winston = require('winston');

function loggerCreate(config){

    const logger = winston.createLogger({
        level: config.getLogLevel(),
        format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} ${level}: ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'app.log' }), // Salvar logs em um arquivo
        ],
    });

    return logger
}

module.exports = loggerCreate;