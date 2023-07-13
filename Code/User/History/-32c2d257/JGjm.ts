if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: true, // Origem permitida
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'], // Métodos HTTP permitidos
      allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    }),
  );

  app.useBodyParser('json', { limit: '10mb' });


  await app.listen(3000);
}
bootstrap();
