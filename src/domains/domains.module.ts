import { Module } from '@nestjs/common';
import { DomainsController } from './controllers/domains.controller';
import { DomainsService } from './services/domains.service';
import { PingDomainsService } from './services/ping-domains.service';
import { TelegramModule } from '../telegram/telegram.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainsEntity } from './entity/domains.entity';

@Module({
  controllers: [DomainsController],
  providers: [DomainsService, PingDomainsService],
  imports: [TelegramModule, TypeOrmModule.forFeature([DomainsEntity])],
})
export class DomainsModule {}
