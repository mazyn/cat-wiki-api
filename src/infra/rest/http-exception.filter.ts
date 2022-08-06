import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

/**
 * Http Error Filter.
 * Gets an HttpException in code and creates an error response
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.warn(
      '⚠ There was an error while executing an HTTP call, see the exception for more details...',
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();

    if (statusCode !== HttpStatus.UNPROCESSABLE_ENTITY) {
      const exceptionObject = {
        statusCode,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      this.logger.error('Exception object: ', exceptionObject);

      response.status(statusCode).json(exceptionObject);

      return;
    }

    const exceptionResponse: any = exception.getResponse();

    const exceptionObject = {
      statusCode,
      error: exceptionResponse.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.error('Exception object: ', exceptionObject);

    response.status(statusCode).json(exceptionObject);
  }
}
