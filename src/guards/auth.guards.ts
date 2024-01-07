import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // method level
    /*     const roles = this.reflector.get(Roles, context.getHandler());
    console.log('roles', roles); // ['admin'] */
    // controller.ts
    /*     const roles = this.reflector.get(Roles, context.getClass());
    console.log('roles:', roles); */
    return true;
    /*     const request = context.switchToHttp().getRequest()
    console.log('request', request)
    return false */
  }
}
