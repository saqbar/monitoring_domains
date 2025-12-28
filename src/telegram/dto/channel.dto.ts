import { IsNumber, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {
  @IsNumber()
  @MinLength(12)
  @MaxLength(14)
  @ApiProperty({
    description: 'id telegram канала ',
    default: '-1001782662668',
  })
  channel_id: string;
}
export class DeleteChannelDto {
  @IsNumber()
  @ApiProperty({
    description: 'id telegram канала ',
    minimum: 1,
    default: '1',
  })
  id: number;
}
