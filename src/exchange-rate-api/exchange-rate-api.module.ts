import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ExchangeRateApiService } from './exchange-rate-api.service';

@Module({
  imports: [PrismaModule],
  providers: [ExchangeRateApiService],
  exports: [ExchangeRateApiService],
})
export class ExchangeRateApiModule {}
