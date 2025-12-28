import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('domains')
export class DomainsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  domain: string;

  @Column({ type: 'text', nullable: true })
  row_text: string;
}
