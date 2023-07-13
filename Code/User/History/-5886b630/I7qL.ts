import { Injectable } from '@nestjs/common';
import { TypeOrmHealthIndicator, HealthCheck, HealthCheckService, HealthCheckResult } from '@nestjs/terminus';
@Injectable()
export class AppService {

  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator
  ) {}

  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }
}
