import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TemplateEntity } from './template.entity';

@Entity({ name: 'layouts' })
export class LayoutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // informations to be used when creating a card from template
  @Column({ type: 'json' })
  informations: Record<string, any>;

  @Column()
  background: string;

  @Column()
  fontColor: string;

  @OneToOne(() => TemplateEntity, (template) => template.front || template.back)
  template: TemplateEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
