import { Module } from '@nestjs/common'
import { GuardController } from './guards.controller'

@Module({
  controllers: [GuardController]
})

export class GuardModule {}