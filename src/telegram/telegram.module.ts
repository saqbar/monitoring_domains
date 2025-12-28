import { Module } from '@nestjs/common';
import { TelegramController } from './controllers/telegram.controller';
import { TelegramService } from './services/telegram.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './enteties/session.entity';
import { ChanelTg } from './enteties/chanel_tg.entity';

@Module({
  controllers: [TelegramController],
  providers: [TelegramService],
  imports: [TypeOrmModule.forFeature([SessionEntity, ChanelTg])],
})
export class TelegramModule {}
