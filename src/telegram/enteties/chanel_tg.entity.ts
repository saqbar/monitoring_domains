import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chanel_tg')
export class ChanelTg {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  channel_id: string;
}
