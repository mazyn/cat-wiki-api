import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { IPrismaService } from 'domain/db/prisma.service.interface';
import { HttpExceptionFilter } from 'infra/rest/http-exception.filter';
import { LoggingInterceptor } from 'infra/rest/logging.interceptor';
import { ValidationPipe } from 'infra/rest/validation.pipe';

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    Logger.log(
      `Environment: ${chalk
        .hex('#87e8de')
        .bold(`${process.env.NODE_ENV?.toUpperCase()}`)}`,
      'Bootstrap',
    );

    // Prisma enableShutdownHooks fix
    const prismaService = app.get(IPrismaService);
    await prismaService.enableShutdownHooks(app);

    // APP Definition
    const configService = app.get(ConfigService);
    const APP_NAME = configService.get('APP_NAME');
    const APP_DESCRIPTION = configService.get('APP_DESCRIPTION');
    const API_VERSION = configService.get('API_VERSION', 'v1');

    // REST Global configurations
    app.setGlobalPrefix(`/${API_VERSION}`);
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    // Swagger configuration
    const options = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setDescription(APP_DESCRIPTION)
      .setVersion(API_VERSION)
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    SwaggerModule.setup('/', app, document);

    Logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer');
    Logger.log('Mapped {/api, GET} Swagger api route', 'RouterExplorer');

    // Security and performance
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
      }),
    );
    app.use(
      rateLimit({
        windowMs: 1000 * 60 * 60,
        max: 1000, // 1000 requests por windowMs
        message:
          '⚠️Too many request created from this IP, please try again after an hour',
      }),
    );

    const HOST = configService.get('HOST', 'localhost');
    const PORT = configService.get('PORT', '3000');

    await app.listen(PORT);

    process.env.NODE_ENV !== 'production'
      ? Logger.log(
          `🚀 Server ready at http://${HOST}:${chalk
            .hex('#87e8de')
            .bold(`${PORT}`)}`,
          'Bootstrap',
        )
      : Logger.log(
          `🚀 Server is listening on port ${chalk
            .hex('#87e8de')
            .bold(`${PORT}`)}`,
          'Bootstrap',
        );

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    Logger.error(`❌ Error starting server, ${error}`, 'Bootstrap');
    process.exit();
  }
}

bootstrap().catch((e) => {
  Logger.error(`❌ Error starting server, ${e}`, 'Bootstrap');
  throw e;
});
