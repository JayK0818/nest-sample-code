import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from './auth.guards'
import { Roles } from './role.decorator'

@Controller('guard')
@UseGuards(AuthGuard)
export class GuardController {
  @Get('role_list')
  @Roles(['admin'])
  getRoleList() {
    return ['管理员', '普通管理员', 'Vip用户']
  }
  @Get('user_list')
  @Roles(['user'])
  getUserList () {
    return ['张三', '李四', '王五']
  }
}