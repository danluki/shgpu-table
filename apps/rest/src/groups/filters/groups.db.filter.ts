import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalResponseError } from 'src/exceptions/global-response.error';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class GroupsDbFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message = (exception as any).message.message;
    let code = 'HttpException';

    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case TypeORMError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = 'idk what to do';
        code = (exception as any).code;
        break;
    }

    response
      .status(status)
      .json(GlobalResponseError(status, message, code, request));
  }
}
