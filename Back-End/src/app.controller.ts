import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { TimestampInterceptor } from './interceptor/timestamp-interceptor';

@UseInterceptors(TimestampInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/random')
  random(): { value: number } {
    return { value: Math.floor(Math.random() * 100) + 1 };
  }
}
