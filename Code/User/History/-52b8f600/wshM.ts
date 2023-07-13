import { LayoutEntity } from './layout.entity';
import { CardEntity } from '@app/card/card.entity';
import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => LayoutEntity, (layout) => layout.id)
  @JoinColumn({ name: 'back' })
  back: LayoutEntity;

  @OneToOne(() => LayoutEntity, (layout) => layout.id)
  @JoinColumn({ name: 'front' })
  front: LayoutEntity;

  @OneToMany(() => CardEntity, (card) => card.template)
  cards: CardEntity[];
}
