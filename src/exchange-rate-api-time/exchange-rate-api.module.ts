import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ExchangeRateApiTimeService } from './exchange-rate-api.service';

@Module({
  imports: [PrismaModule],
  providers: [ExchangeRateApiTimeService],
  exports: [ExchangeRateApiTimeService],
})
export class ExchangeRateApiTimeModule {}
