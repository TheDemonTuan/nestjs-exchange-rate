import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async exchangeRateApi(@Res() res: Response) {
    return res.render('api', await this.appService.exchangeRateApi());
  }

  @Get('raw')
  async exchangeRateRaw(@Res() res: Response) {
    return res.render('raw', await this.appService.exchangeRateRaw());
  }
}
