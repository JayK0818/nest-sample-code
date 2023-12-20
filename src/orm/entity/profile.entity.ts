import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @Column()
  birth_date: string;
}
