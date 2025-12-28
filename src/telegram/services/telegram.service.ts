import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from '../enteties/session.entity';
import { Repository } from 'typeorm';
import * as process from 'process';

@Injectable()
export class TelegramService implements OnModuleInit {
  public client: TelegramClient;
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionEntityRepository: Repository<SessionEntity>,
  ) {}

  async onModuleInit() {
    try {
      const sessionFromDb = await this.getSessionDb();
      console.log('Session from DB:', sessionFromDb);

      this.client = new TelegramClient(
        new StringSession(process.env.TG_SESSION || sessionFromDb),
        // new StringSession(sessionFromDb), // Используем сессию из БД или ''
        Number(process.env.TG_API_ID),
        process.env.TG_API_HASH,
        { connectionRetries: 5 },
      );
      await this.client.connect();
      this.client.start({
        phoneNumber: async () => String(process.env.TG_PHONE),
        password: async () => process.env.TG_PASSWORD,
        phoneCode: async () => {
          console.log('Введите код из Telegram:');
          return new Promise((resolve) => {
            process.stdin.once('data', (data) =>
              resolve(data.toString().trim()),
            );
          });
        },
        onError: (err) => console.log(err),
      });
      console.log('Client started');
      console.log('Client connected');

      // console.log('Session=', this.client.session);
      if (this.client.session && !sessionFromDb) {
        await this.saveSession();
        console.log('Session saved to DB');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getSessionDb() {
    try {
      const sessionDb = await this.sessionEntityRepository.findOne({
        where: { id: 1 },
      });
      if (sessionDb) {
        return sessionDb.sessionData;
      } else {
        return '';
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async saveSession() {
    try {
      const check_tg_authorization = await this.client.checkAuthorization();
      // console.log(check_tg_authorization);
      if (check_tg_authorization) {
        if (await this.sessionEntityRepository.findOne({ where: { id: 1 } })) {
          await this.sessionEntityRepository.update(
            { id: 1 },
            {
              sessionData: String(this.client.session.save()),
            },
          );
        } else {
          const save_db_session = await this.sessionEntityRepository.save({
            sessionData: String(this.client.session.save()),
          });
          if (save_db_session) {
            console.log('Session saved to database');
          }
        }
      } else {
        console.log(
          'You are connected to telegram servers but not logged in with any account',
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
