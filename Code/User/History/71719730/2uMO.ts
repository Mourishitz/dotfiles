import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'templates' })
export class TemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // informations to be used when creating a card from template
  @Column({ type: 'json' })
  informations: Record<string, any>;

  @Column()
  background: string;

  @Column()
  fontColor: string;

  @OneToOne()
  template: TemplateEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
