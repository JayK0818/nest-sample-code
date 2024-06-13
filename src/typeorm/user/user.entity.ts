import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  JoinColumn, OneToOne
} from 'typeorm'
import { UserProfile } from './user-profille.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date

  @OneToOne(type => UserProfile, profile => profile.user)
  @JoinColumn()
  profile: UserProfile
}