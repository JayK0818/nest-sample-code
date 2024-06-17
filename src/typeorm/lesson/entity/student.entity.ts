import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToMany, JoinTable } from 'typeorm'
import { Lesson } from './lesson.entity'
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date

  @ManyToMany(() => Lesson, lesson => lesson.students)
  lessons: Lesson[]
}