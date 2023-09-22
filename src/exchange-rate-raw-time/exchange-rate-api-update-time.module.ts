import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ExchangeRateRawTimeService } from './exchange-rate-api-update-time-service';

@Module({
  imports: [PrismaModule],
  providers: [ExchangeRateRawTimeService],
  exports: [ExchangeRateRawTimeService],
})
export class ExchangeRateRawTimeModule {}
