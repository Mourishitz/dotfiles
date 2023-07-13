import { Injectable } from '@nestjs/common';
import { TypeOrmHealthIndicator } from '@nestjs/terminus';
@Injectable()
export class AppService {

  constructor(
    private db: TypeOrmHealthIndicator
  ) {}

  healthCheck(): string {
    return 'Hello World!';
  }
}
