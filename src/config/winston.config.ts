import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file'; // 添加类型导入

export const winstonConfig = () => {
  // const isProduction = process.env.NODE_ENV === 'production';
  const {
    format: { combine, timestamp, errors, splat, json },
  } = winston;

  return {
    level: 'debug', // 修改为 debug 级别，以捕获所有日志
    format: combine(timestamp(), errors({ stack: true }), splat(), json()),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(
            ({ timestamp, level, message, context, stack }: any) => {
              return stack
                ? `${timestamp} [${context}] ${level}: ${message}\n${stack}`
                : `${timestamp} [${context}] ${level}: ${message}`;
            },
          ),
        ),
      }),
      new DailyRotateFile({
        filename: 'logs/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        auditFile: 'logs/.audit.json',
        createSymlink: true,
      }),
      // 添加专门的错误日志文件
      new DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'error', // 只记录错误级别的日志
        auditFile: 'logs/.error-audit.json',
      }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'logs/exceptions.log' }),
    ],
  };
};
