import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToMany, JoinTable
} from 'typeorm'
import { Category } from './category.entity'

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  text: string

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}