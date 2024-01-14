import { Controller, Get } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Controller('event-emitter')
export class EventEmitterController {
  constructor(private eventEmitter: EventEmitter2) {}
  @Get('order/create')
  createOrder() {
    this.eventEmitter.emit('order.create', {
      message: 'hello world',
    });
    console.log('你好 生活');
    return 'hello';
  }
  @OnEvent('order.create', { async: false })
  listenOrderCreateEvent(payload: any) {
    console.log('payload', payload);
  }
}
