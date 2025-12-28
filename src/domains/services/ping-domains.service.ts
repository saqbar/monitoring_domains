import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TelegramService } from '../../telegram/services/telegram.service';
import { DomainsService } from './domains.service';
import axios from 'axios';
import { TelegramHelperService } from '../../telegram/services/telegram-helper.service';

@Injectable()
export class PingDomainsService {
  constructor(
    private readonly domainsService: DomainsService,
    private readonly telegramHelperService: TelegramHelperService,
  ) {}

  async ping_domains() {
    try {
      const auth_tg = await this.telegramHelperService.checkAuthorizationTG();
      if (auth_tg) {
        const domains = await this.domainsService.findAll();
        if (domains) {
          for (const domain of domains) {
            const ping = await this.domainsService.verify_domain(domain.domain);
            if (!ping) {
              await this.telegramHelperService.sendMessageToNewChannel(
                `Domain ${domain.domain} is not working`,
                process.env.TG_CHAT_ID,
              );
            }
          }
        }
      }
      //
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async ping_domains2() {
    // const ping = await axios.get(`https://google.com`);
    const ping = await axios.get(`https://hdrezka-home.tv`);
    console.log(ping.status);
    return ping.status;
  }
}
