import { Injectable } from '@nestjs/common';
import { MEMORY_LIMIT, OS_PATH } from '@app/config'
import { 
  TypeOrmHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HealthCheckResult,
  DiskHealthIndicator,
  MemoryHealthIndicator
} from '@nestjs/terminus';

@Injectable()
export class AppService {

  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.memory.checkHeap('memory_heap', MEMORY_LIMIT * 1024 * 1024),
      () => this.disk.checkStorage('storage', { path: OS_PATH, thresholdPercent: 0.5 }),
    ]);
  }
}
