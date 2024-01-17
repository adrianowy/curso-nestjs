import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  console.log(`Listen on Port: ${port}`);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
