import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CreatePlayerDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log('data:', data);
    const request = ctx.switchToHttp().getRequest();
    console.log(request.body);
    const ids = JSON.parse(request.body.ids ?? '[]');
    return {
      ...request.body,
      ids,
    };
  },
);
