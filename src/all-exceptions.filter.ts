import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();

    // console.log('Caught exception:', exception);
    let message: string;
    let status: number;
    if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        message = `${exception.meta.target} already exists.`;
        status = 409;
      }
      if (exception.code === 'P2011') {
        message = `Empty value invalid input ${exception.meta.target}`;
        status = 409;
      }
      if (exception.code === 'P2009') {
        message = 'Prisma query validation error';
        status = 409;
      }
    }

    if (exception instanceof PrismaClientValidationError) {
      message = `Input validation failed`;
      status = 422;
    }

    if (exception instanceof PrismaClientInitializationError) {
      if (
        exception.errorCode === 'P1001' ||
        exception.errorCode === 'P1002' ||
        exception.errorCode === 'P1017'
      ) {
        message = `Could not connect with db server, please check you connection `;
        status = 500;
      }
    }

    if (exception instanceof PrismaClientUnknownRequestError) {
      message = `Better restart the app`;
      status = 500;
    }
    if (message && status) {
      response.status(status || 500).json({
        statusCode: status || 500,
        //   timestamp: new Date().toISOString(),
        // path: request.url,
        message: message,
      });
    } else {
      super.catch(exception, host);
    }
  }
}
