import { TemplateEntity } from '@app/template/template.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cards' })
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TemplateEntity, (template) => template.cards, {
    eager: true,
  })
  @JoinColumn({ name: 'template' })
  template: TemplateEntity;

  // filled based on layouts
  @Column({ type: 'json' })
  data: Record<string, any>;
}