import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndMerge('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('roles', roles);
    if (roles.includes(Role.Admin)) return false;
    return true;
  }
}
