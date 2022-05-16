import { Global, Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { PrismaClient } from '@prisma/client/';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule extends PrismaClient {
  constructor(config: ConfigService){
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
