import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { ClassModule } from './class/class.module'

@Module({
  imports: [
    UserModule,
    ClassModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '15209891396kyrie',
      database: 'test',
      synchronize: false,
      autoLoadEntities: true
    }),
  ],
})
export class TypeormAppModule {}