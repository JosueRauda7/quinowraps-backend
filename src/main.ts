import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ErrorHandlerMiddlerware from './presentation/middleware/error-handler-middleware';
import GlobalResponse from './application-core/wrapper/global-response';
import GlobalResponseMiddleware from './presentation/middleware/global-response-middleware';
import { ValidationException } from './application-core/exception/validation-exception';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ENVIRONMENT_DATA } from './application-core/interfaces/i-consul';
import ConsulService from './infraestructure/services/consul/consul.service';
import { formatValidationErrors } from './infraestructure/utils/format-validation-dto-errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ allowedHeaders: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = formatValidationErrors(errors);
        return new ValidationException('Errores de validación', messages);
      },
    }),
  );
  app.useGlobalFilters(new ErrorHandlerMiddlerware());
  //agregamos el middleware de errores globales
  app.useGlobalInterceptors(new GlobalResponseMiddleware());
  const config = new DocumentBuilder()
    .setTitle('Integrador de OpenAI de Quinowraps')
    .setDescription('API para el integrador de OpenAI de Quinowraps')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.APP_PORT || 3000, () => {
    console.log(
      `Servidor corriendo en puerto ${process.env.APP_PORT || 3000} 🚀`,
    );
  });
}
bootstrap();
