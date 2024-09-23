import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EurekaModule } from "nestjs-eureka";

@Module({
  imports: [
    EurekaModule.forRoot({
      eureka: {
        disable: false,
        disableDiscovery: false,
        host: 'localhost',
        port: 8761,
        registryFetchInterval: 1000,
        servicePath: '/eureka/apps',
        maxRetries: 3,
      },
      service: {
        name: 'api-service',
        port: 3000,
      },
    }),
    ClientsModule.register([
      {
        name: 'APP_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'core_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'TICKET_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'ticket_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
