import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'layouts' })
export class TemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // informations to be used when creating a card from template
  @Column({ type: 'json' })
  informations: Record<string, any>;

  @Column()
  background: string;

  @Column()
  fontColor: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
