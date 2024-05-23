const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' })
    ]
});

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = 'fail';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const globalHandlerError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    logger.error(err); // Pasar el error al logger

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};

module.exports = {
    AppError,
    globalHandlerError
};
