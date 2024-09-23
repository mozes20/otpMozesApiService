import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.validateToken();
  }

  @Post('validate-card')
  validateCard(@Body() body: { userId: number; amount: number }) {
    const { userId, amount } = body;
    return this.appService.validateCard(userId, amount);
  }

  @Get('partner-events')
  getPartnerEvents() {
    return this.appService.getPartnerEvents();
  }

  @Get('event-details/:eventId')
  getEventDetails(@Param('eventId') eventId: string) {
    return this.appService.getEventDetails(eventId);
  }
}
