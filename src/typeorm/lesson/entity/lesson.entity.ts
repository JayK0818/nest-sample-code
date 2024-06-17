import {
  Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity,
  ManyToMany, JoinTable
} from 'typeorm'
import { Student } from './student.entity'

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  teacher: string

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date

  // 包含多个学生
  @ManyToMany(() => Student, student => student.lessons)
  @JoinTable()
  students: Student[]
}