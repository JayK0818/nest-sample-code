# TypeORM

**TypeORM** is the most mature Object Relational Mapper(ORM) available for TypeScript.
对象关系映射

常见关联类型： 一对一，一对多，多对多

```ts
// install
npm install --save @nestjs/typeorm typeorm mysql2

// usage
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost:3000',
      port: '27017',
      username: 'hello',
      password: 'world'
    })
  ]
})

// 读取配置文件的数据
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        return {
          type: 'mysql',
          port: configService.get<number>(DB_PORT)
        }
      })
    })
  ]
})
```

## Entity

**TypeORM** supports the repository design pattern.

```ts
// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
```

To begin using **User** entity, we need to let TypeORM know about it by inserting it into the **entities** array
in the module **forRoot** method options.
(为了能够使用 Uset 实体, 我们需要在 forRoot()方法的选项中的数组中插入该实体 以便让 TypeORM 知道它。)

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entites: [User]
      // ...
    })
  ]
})


// user.module.ts
@Module({
  /**
   * This module uses the **forFeature() to define which repositories are registered in the current scope.**
  */
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController]
})

// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }
}
```

## Relations

Relations are associations established between two or more tables. Relations are based on common fields from
each table.

1. One-to-one: use the **@OneToOne()** decorator.
2. One-to-many/Many-to-one: use the **OneToMany()** and **@ManyToOne()** decorators.
3. Many-to-many: use the **@ManyToMany()** decorator

以下是一个 one-to-one 的例子, 每个用户对应一个 他自己的用户资料表, 并且一个用户资料文件仅由一个用户拥有。

```ts
// 以下demo 来自于 typeorm 中文官网
// https://typeorm.biunav.com/zh/one-to-one-relations.html

// user.entity.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from '@nestjs/typeorm';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @OneToOne(Profile)
  @JoinColumn()
  profile: Profile;
}
```

**@JoinColumn()** 只能在关系的一侧设置(且必须在数据库表中具有外键的一侧)。另一个表将包含一个 **relation id** 和目标实体表的外键。
