import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  age: number

  @Column()
  address: string

  @Column()
  school: string
}