import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
// import { GradeModule } from './grade/grade.module';
import { LessonModule } from './lesson/lesson.module'
import { QuestionModule } from './question/question.module'

@Module({
  imports: [
    UserModule,
    // GradeModule,
    LessonModule,
    QuestionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '15209891396kyrie',
      database: 'test',
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
})
export class TypeormAppModule {}