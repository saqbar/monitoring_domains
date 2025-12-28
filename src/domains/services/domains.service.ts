import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDomainDto } from '../dto/domains.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainsEntity } from '../entity/domains.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class DomainsService {
  constructor(
    @InjectRepository(DomainsEntity)
    private readonly domainsEntityRepository: Repository<DomainsEntity>,
  ) {}

  async findAll(): Promise<DomainsEntity[]> {
    try {
      return await this.domainsEntityRepository.find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(body: CreateDomainDto): Promise<boolean> {
    try {
      if (!this.verify_domain(body.domain)) {
        throw new HttpException(
          'Domain is not working',
          HttpStatus.BAD_REQUEST,
        );
      }
      const domain = this.domainsEntityRepository.create({
        name: body.name,
        domain: body.domain,
        row_text: body.row_text || '',
      });
      await this.domainsEntityRepository.save(domain);
      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async verify_domain(domain: string): Promise<boolean> {
    const protocols = ['https', 'http'];

    for (const protocol of protocols) {
      try {
        const response = await axios.get(`${protocol}://${domain}`);
        if (response.status === HttpStatus.OK) {
          return true;
        }
      } catch (error) {
        continue;
      }
    }
    return false;
  }
}
