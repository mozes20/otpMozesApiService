import { Inject, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  private rabbitTicketClient: ClientProxy;
  constructor(@Inject('APP_SERVICE') private rabbitClient: ClientProxy) {
    this.rabbitTicketClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'ticket_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  }
  getHello(): Observable<any> {
    return this.rabbitClient.send('notifications', 'Hello World!2');
  }

  validateToken(): Observable<any> {
    return this.rabbitClient.send(
      { cmd: 'validate-token' },
      {
        token:
          'dGVzenQuYWxhZGFyQG90cG1vYmlsLmNvbSYxMDAwJkY2N0MyQkNCRkNGQTMwRkNDQjM2RjcyRENBMjJBODE3',
      },
    );
  }

  validateCard(userId: number, amount: number): Observable<any> {
    return this.rabbitClient.send({ cmd: 'validate-card' }, { userId, amount });
  }

  getPartnerEvents(): Observable<any> {
    return this.rabbitTicketClient.send({ cmd: 'get_partner_events' }, {});
  }

  getEventDetails(eventId: string): Observable<any> {
    console.log(eventId);
    return this.rabbitTicketClient.send(
      { cmd: 'get_event_details' },
      { eventId },
    );
  }
}
