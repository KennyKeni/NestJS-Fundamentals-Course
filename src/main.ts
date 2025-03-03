import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { PostgresqlExceptionFilter } from './common/filters';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie, {
    secret: process.env.JWT_SECRET, 
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true, 
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PostgresqlExceptionFilter(),
  );
  app.useGlobalInterceptors( 
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
