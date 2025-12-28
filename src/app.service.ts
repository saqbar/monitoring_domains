import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  pingApp(): string {
    return 'App is running!';
  }
}
