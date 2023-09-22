import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ExchangeRateRawModule } from './exchange-rate-raw/exchange-rate-api-update-time.module';
import { ExchangeRateRawTimeModule } from './exchange-rate-raw-time/exchange-rate-api-update-time.module';
import { ExchangeRateApiModule } from './exchange-rate-api/exchange-rate-api.module';
import { ExchangeRateApiTimeModule } from './exchange-rate-api-time/exchange-rate-api.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    ExchangeRateApiModule,
    ExchangeRateApiTimeModule,
    ExchangeRateRawModule,
    ExchangeRateRawTimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
