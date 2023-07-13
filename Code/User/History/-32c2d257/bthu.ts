if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import * as bodyParser from 'body-parser';
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
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


  await app.listen(3000);
}
bootstrap();
