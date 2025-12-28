import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { DomainsService } from '../services/domains.service';
import { CreateDomainDto } from '../dto/domains.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ValidationDomainPipe } from '../pipes/validation-domain.pipe';
import { PingDomainsService } from '../services/ping-domains.service';

@ApiTags('Domains')
@Controller('domains')
export class DomainsController {
  constructor(
    private readonly domainsService: DomainsService,
    private readonly pingDomainsService: PingDomainsService,
  ) {}

  @ApiProperty({ description: 'Force Check Domains' })
  @Get('force_check_domains')
  async forceCheckDomains() {
    try {
      return this.pingDomainsService.ping_domains();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiProperty({ description: 'Get all domains' })
  @Get()
  findAll() {
    try {
      return this.domainsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UsePipes(new ValidationDomainPipe())
  @Post('add_new_domain')
  create(@Body() body: CreateDomainDto) {
    try {
      return this.domainsService.create(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('test_ping_domains')
  async test_ping_domains(@Res() res) {
    try {
      const response = await this.pingDomainsService.ping_domains();
      // console.log(res);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
