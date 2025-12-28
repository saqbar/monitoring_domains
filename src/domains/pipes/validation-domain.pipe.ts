import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationDomainPipe implements PipeTransform {
  private readonly sqlInjectionPattern =
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE|EXEC|DECLARE|CAST)\b)|(--)|(\/\*)|(;\s*$)|(\bOR\b\s+\d+=\d+)/gi;

  transform(value: any) {
    if (value === null || value === undefined) {
      throw new BadRequestException('Данные не переданы');
    }
    let domain = typeof value === 'object' ? value.domain : value;
    value.domain = domain.replace(/^https?:\/\/|[\/?#].*$/g, '');
    // if (dataToValidate.length > 3) {
    //   throw new BadRequestException('domain is not valid');
    // }
    if (this.sqlInjectionPattern.test(domain)) {
      throw new BadRequestException('Обнаружена попытка SQL инъекции!');
    }
    return value;
  }
}
