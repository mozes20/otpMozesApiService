import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('APP_SERVICE') private rabbitClient: ClientProxy) {}
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
    return this.rabbitClient.send(
      { cmd: 'validate-card' },
      { userId, amount },
    );
  }
}
