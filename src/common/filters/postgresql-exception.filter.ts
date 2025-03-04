import { DriverException } from '@mikro-orm/core';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { HttpStatus } from '@nestjs/common';

@Catch(DriverException)
export class PostgresqlExceptionFilter<T extends DriverException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      error: exception.name,
      code: exception.code,
    });
  }
}
