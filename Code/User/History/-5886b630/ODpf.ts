import { Injectable } from '@nestjs/common';
import { TypeOrmHealthIndicator, HealthCheck } from '@nestjs/terminus';
@Injectable()
export class AppService {

  constructor(
    private db: TypeOrmHealthIndicator
  ) {}

  @HealthCheck()
  healthCheck() {
    return 'Hello World!';
  }
}
