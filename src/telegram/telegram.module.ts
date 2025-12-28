import { Module } from '@nestjs/common';
import { TelegramController } from './controllers/telegram.controller';
import { TelegramService } from './services/telegram.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './enteties/session.entity';
import { ChanelTg } from './enteties/chanel_tg.entity';
import { TelegramHelperService } from './services/telegram-helper.service';
import { ChannelTgService } from './services/channels-tg.service';
import { ChannelTgEntity } from './enteties/channels.entity';

@Module({
  controllers: [TelegramController],
  providers: [TelegramService, TelegramHelperService, ChannelTgService],
  imports: [
    TypeOrmModule.forFeature([SessionEntity, ChanelTg, ChannelTgEntity]),
  ],
  exports: [TelegramHelperService, ChannelTgService],
})
export class TelegramModule {}
