import { Injectable } from '@nestjs/common';
import { TypeOrmHealthIndicator, HealthCheck, HealthCheckService } from '@nestjs/terminus';
@Injectable()
export class AppService {

  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator
  ) {}

  @HealthCheck()
  healthCheck() {
    return 'Hello World!';
  }
}
