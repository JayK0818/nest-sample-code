import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Grade } from './grade.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @ManyToOne(() => Grade, (c) => c.students)
  grade: number;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}