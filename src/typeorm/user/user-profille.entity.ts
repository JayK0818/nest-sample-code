import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { User } from './user.entity'
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

  @OneToOne(() => User, user => user.profile)
  user: User
}