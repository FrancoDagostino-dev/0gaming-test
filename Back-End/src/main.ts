import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: 'http://localhost:5173', 
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],  
      credentials: true, 
    })
  );

  await app.listen(3000); 
}
bootstrap();


