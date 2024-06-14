import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ClassEntity } from './class.entity'

@Entity()
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  age: number

  @ManyToOne(() => ClassEntity, c => c.students)
  class: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}