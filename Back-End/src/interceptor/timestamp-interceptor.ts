import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TimestampInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimestampInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log(
      `"/${context.getHandler().name}" issued at ${new Date().toISOString()}`,
    );
    return next.handle();
  }
}
