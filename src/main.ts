import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const fails = Object.fromEntries(
          errors.map((error) => [
            error.property,
            Object.values(error.constraints),
          ]),
        );
        return new BadRequestException({
          success: false,
          message: 'Validation failed',
          fails,
        });
      },
    }),
  );
  app.setGlobalPrefix('/api/v1', { exclude: ['/'] });
  await app.listen(process.env.PORT);
}
bootstrap();
