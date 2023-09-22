import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ExchangeRateRawService } from './exchange-rate-api-update-time-service';

@Module({
  imports: [PrismaModule],
  providers: [ExchangeRateRawService],
  exports: [ExchangeRateRawService],
})
export class ExchangeRateRawModule {}
