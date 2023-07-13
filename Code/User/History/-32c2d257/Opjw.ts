if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { HttpExceptionFilter } from '@app/shared/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    cors({
      origin: true, // Origem permitida
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'], // Métodos HTTP permitidos
      allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    }),
  );

  await app.listen(3000);
}
bootstrap();
