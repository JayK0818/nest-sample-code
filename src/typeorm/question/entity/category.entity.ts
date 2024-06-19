import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
} from 'typeorm';
import { Question } from './question.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Question, question => question.categories)
  questions: Question[]
    
  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}