import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBIT_MQ_USER}:${process.env.RABBIT_MQ_PASS}@${process.env.RABBIT_MQ_IP}:${process.env.RABBIT_MQ_PORT}/smartranking`,
      ],
      queue: 'admin-backend',
    },
  });

  // eslint-disable-next-line
  // @ts-ignore
  await app.listen(() => logger.log('Microservice is listening'));
}
bootstrap();
