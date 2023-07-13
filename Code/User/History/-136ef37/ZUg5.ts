import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import { UserModule } from '@app/user/user.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { TemplateModule } from '@app/template/template.module';
import { CardModule } from '@app/card/card.module';
import { TerminusModule } from '@nestjs/terminus';
import { APP_FILTER } from '@nestjs/core';
import { HttpNotFoundExceptionFilter } from '@app/shared/exceptions/http-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
      autoLoadEntities: true,
    }),
    UserModule,
    TemplateModule,
    CardModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
      provide: APP_FILTER,
      useClass: HttpNotFoundExceptionFilter,
    },],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
