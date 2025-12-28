import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ChannelTgService } from '../services/channels-tg.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateChannelDto, DeleteChannelDto } from '../dto/channel.dto';

@ApiTags('Channel tg')
@Controller('telegram')
export class TelegramController {
  constructor(private readonly channelTgService: ChannelTgService) {}

  @Post('add_channel_tg')
  async add_channel_tg(@Body() body: CreateChannelDto, @Res() res) {
    try {
      const responce = this.channelTgService.addNewChanel(body);
      return res.status(HttpStatus.OK).json(responce);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get_all_channels')
  async getAllChannel(@Res() res) {
    try {
      const responce = this.channelTgService.getAllChannels();
      return res.status(HttpStatus.OK).json(responce);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete_channel')
  async delete_channel(@Body() body: DeleteChannelDto, @Res() res) {
    try {
      const responce = this.channelTgService.deleteChannel(body);
      return res.status(HttpStatus.OK).json(responce);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
