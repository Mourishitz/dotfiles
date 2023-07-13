import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { CardEntity } from '@app/card/card.entity';
import { LayoutEntity } from './layout.entity';

@Entity({ name: 'templates' })
export class TemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  expires: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => LayoutEntity)
  @JoinColumn()
  back: LayoutEntity;

  @OneToOne(() => LayoutEntity)
  @JoinColumn()
  front: LayoutEntity;

  @OneToMany(() => CardEntity, (card) => card.template)
  cards: CardEntity[];
}
