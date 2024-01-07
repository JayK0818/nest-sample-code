import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Roles } from './role.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ExecutionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    /*     const [req, res, next] = context.getArgs();
    console.log(req, res, next); */
    /*     const request = context.getArgByIndex(0);
    const response = context.getArgByIndex(1);
    console.log(request, response); */
    // const http = context.switchToHttp();
    /*     const req = http.getRequest();
    const res = http.getResponse(); */
    const handler = context.getHandler();
    console.log(handler.name); // getPlayerList
    const type = context.getClass();
    console.log(type.name); // ExecutionContextController
    // method level
    /*     const roles = this.reflector.get(Roles, context.getHandler());
    console.log(roles); // [admin] */
    // controller level
    const roles = this.reflector.get(Roles, context.getClass());
    console.log(roles); // ['admin']

    const merge_roles = this.reflector.getAllAndOverride(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(merge_roles); // ['user']

    const roles_arr = this.reflector.getAllAndOverride(Roles, [
      context.getClass(),
      context.getHandler(),
    ]);
    console.log(roles_arr); // ['admin']

    const merge_roles_1 = this.reflector.getAllAndMerge(Roles, [
      context.getClass(),
      context.getHandler(),
    ]);
    console.log(merge_roles_1); // ['admin', 'user']

    const set_roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    console.log(set_roles);
    return true;
  }
}
