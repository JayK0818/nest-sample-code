# 实体

  实体时一个映射到数据库表的类。可以通过定义一个类 创建实体。并用 `@Entity()` 来标记。

```ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('my_users') // 替换表名
export class User {
  @PrimaryGeneratedColumn ()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  isActive: boolean
}
```

  实体需要注册

```ts
const connection = await createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  entites: ['entity/*.js']
})
```

## 主列

  每个实体至少必须有一个主列。

```ts
import { PrimaryColumn, PrimaryGeneratedColumn, Entity } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn() //不用自动分配, 该值会自动生成。
  id: number

  @PrimaryColumn()
  id: number  //需要在保存之前手动分配

  @PrimaryGeneratedColumn('uuid')
  id: string; // 生成一个 uuid
}
```