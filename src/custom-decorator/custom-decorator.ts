import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.headers;
  },
);

// ------------- 通过key 提取属性 ----------------
export const ExtraParameter = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req[data];
  },
);
