import { createLogger, format, transports } from 'winston';
import path from 'path';

const logger = createLogger({
    level: 'info', // Log everything from 'info' level and above
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
        format.errors({ stack: true }), // Capture stack trace on errors
        format.splat(), // String interpolation support
        format.json() // Log in JSON format for easy parsing
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(), // Colorize output in console
                format.simple()    // Print simple text in console
            )
        }),
        new transports.File({
            filename: path.join('logs', 'error.log'), // Log errors in error.log
            level: 'error' 
        }),
        new transports.File({
            filename: path.join('logs', 'combined.log'), // Log all levels in combined.log
        })
    ],
    exceptionHandlers: [
        new transports.File({ filename: path.join('logs', 'exceptions.log') }) // Log unhandled exceptions
    ],
    rejectionHandlers: [
        new transports.File({ filename: path.join('logs', 'rejections.log') }) // Log unhandled promise rejections
    ]
});

export default logger;
