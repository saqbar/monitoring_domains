import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelTgEntity } from '../enteties/channels.entity';
import { Repository } from 'typeorm';
import { CreateChannelDto, DeleteChannelDto } from '../dto/channel.dto';

@Injectable()
export class ChannelTgService {
  constructor(
    @InjectRepository(ChannelTgEntity)
    private readonly channelTgEntityRepository: Repository<ChannelTgEntity>,
    private telegramService: TelegramService,
  ) {}

  async verifyChannelId(chanel_id: string): Promise<string> {
    try {
      let formattedId = chanel_id.trim();
      const REQUIRED_LENGTH = 14;
      if (!formattedId.startsWith('-')) {
        formattedId = `-${formattedId}`;
      }
      if (formattedId.length !== REQUIRED_LENGTH) {
        throw new HttpException(
          `Неверный формат ID. Ожидаемая длина: ${REQUIRED_LENGTH} символов.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const onlyNumbers = /^-?\d+$/.test(formattedId);
      if (!onlyNumbers) {
        throw new HttpException(
          'ID должен содержать только цифры (после знака минус).',
          HttpStatus.BAD_REQUEST,
        );
      }
      return formattedId;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async addNewChanel(chanels: CreateChannelDto): Promise<boolean> {
    try {
      const verify_channel = await this.verifyChannelId(chanels.channel_id);
      const chanel = this.channelTgEntityRepository.create({
        channel_id: verify_channel,
      });
      await this.channelTgEntityRepository.save(chanel);
      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getAllChannels(): Promise<ChannelTgEntity[]> {
    try {
      const channels = await this.channelTgEntityRepository.find();
      if (!channels.length) {
        return [];
      }
      return channels;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteChannel(body: DeleteChannelDto) {
    try {
      await this.channelTgEntityRepository.delete(body.id);
      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
