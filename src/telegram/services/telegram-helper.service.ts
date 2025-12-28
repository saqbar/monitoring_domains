import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Injectable()
export class TelegramHelperService {
  constructor(private telegramService: TelegramService) {}

  async checkAuthorizationTG(): Promise<boolean> {
    try {
      return await this.telegramService.client.checkAuthorization();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async sendMessageToNewChannel(message: string, to_channel_id: string) {
    try {
      await this.telegramService.client.sendMessage(to_channel_id, {
        message: message,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
