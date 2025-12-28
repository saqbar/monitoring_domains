import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiProperty({ description: 'Ping app' })
  @Get('ping_app')
  pingApp(): string {
    return this.appService.pingApp();
  }
}
