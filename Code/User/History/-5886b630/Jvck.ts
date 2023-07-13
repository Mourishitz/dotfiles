import { Injectable } from '@nestjs/common';
import { 
  TypeOrmHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HealthCheckResult,
  DiskHealthIndicator
} from '@nestjs/terminus';

@Injectable()
export class AppService {

  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
    ]);
  }
}
