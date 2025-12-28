import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('channel_tg')
export class ChannelTgEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  channel_id: string;
}
