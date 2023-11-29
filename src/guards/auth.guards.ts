import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles } from './role.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate (context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler())
    console.log('roles', roles) // ['admin']
    return true
/*     const request = context.switchToHttp().getRequest()
    console.log('request', request)
    return false */
  }
}