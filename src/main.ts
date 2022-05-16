import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);

  /**
   * Global validation pipe
   * @property whitelist - when true it strips the properties from the request
   *  that are not used in the application
   */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(PORT, () => {
    console.info('Server listening on port: ', PORT);
  });
}

bootstrap();
