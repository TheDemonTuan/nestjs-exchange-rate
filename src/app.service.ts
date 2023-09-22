import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import * as xml2js from 'xml2js';
import * as cheerio from 'cheerio';
import { ExchangeRateRawService } from './exchange-rate-raw/exchange-rate-api-update-time-service';
import { ExchangeRateRawTimeService } from './exchange-rate-raw-time/exchange-rate-api-update-time-service';
import { ExchangeRateApiService } from './exchange-rate-api/exchange-rate-api.service';
import { ExchangeRateApiTimeService } from './exchange-rate-api-time/exchange-rate-api.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly exchangeRateApiService: ExchangeRateApiService,
    private readonly exchangeRateApiTimeService: ExchangeRateApiTimeService,
    private readonly exchangeRateRawService: ExchangeRateRawService,
    private readonly exchangeRateRawTimeService: ExchangeRateRawTimeService,
  ) {}

  //Khởi tạo dữ liệu tỷ giá từ api của vietcombank vào database
  async onModuleInit() {
    await this.updateExchangeRateApiToDb();
    await this.updateExchangeRateRawToDb();
  }

  async exchangeRateApi() {
    // Lấy dữ liệu tỷ giá từ database
    const exchangeRateApiData = await this.exchangeRateApiService.findAll();

    // Lấy thời gian cập nhật cuối của api và server từ database
    const exchangeRateApiUpdateTime =
      await this.exchangeRateApiTimeService.findUnique({
        id: 1,
      });

    // Nếu thời gian thời gian hiện tại đã lớn hơn hoặc bằng thời gian cập nhật cuối của server thì cập nhật lại dữ liệu
    if (
      new Date().getTime() >=
      parseInt(exchangeRateApiUpdateTime?.server_update_at) + 600000
    )
      await this.updateExchangeRateApiToDb();

    // if (!exchangeRateApiUpdateTime)
    //   // Nếu không có dữ liệu thì trả về null
    //   return;

    return {
      //Trả về dữ liệu tỷ giá
      exchangeRateApiData: exchangeRateApiData,
      //Tạo ra thời gian cập nhật cuối của api
      lastApiUpdate: exchangeRateApiUpdateTime?.api_update_at,
      //Tạo ra thời gian cập nhật cuối của server
      lastServerUpdate: new Date(
        parseInt(exchangeRateApiUpdateTime?.server_update_at),
      ),
      //Tạo ra thời gian cập nhật tiếp theo của server
      nextServerUpdate: new Date(
        parseInt(exchangeRateApiUpdateTime?.server_update_at) + 600000,
      ),
    };
  }

  // Chạy cronjob để cập nhật tỷ giá từ api của vietcombank vào database mỗi 10p
  @Cron('* */10 * * * *')
  async updateExchangeRateApiToDb() {
    // Lấy thời gian cập nhật cuối của api và server từ database
    const exchangeRateApiTime =
      await this.exchangeRateApiTimeService.findUnique({
        id: 1,
      });
    // Nếu thời gian cập nhật cuối của server cách thời gian hiện tại dưới 10p thì không cập nhật

    if (
      exchangeRateApiTime &&
      new Date().getTime() <
        parseInt(exchangeRateApiTime?.server_update_at) + 600000
    )
      return;

    // Gọi lên api của vietcombank để lấy thông tin tỷ giá
    const { data: exchangeRateXML } = await firstValueFrom(
      this.httpService
        .get(
          'https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx',
        )
        .pipe(
          catchError(() => {
            throw new BadRequestException('Invalid request');
          }),
        ),
    );

    // Chuyển đổi dữ liệu xml sang json bằng library xml2js
    const lastApiUpdate = await new Promise((resolve, reject) => {
      xml2js.parseString(exchangeRateXML, async (err, result) => {
        // Nếu có lỗi thì reject
        if (err) reject(err);

        // Lấy dữ liệu tỷ giá từ api của vietcombank
        const exchangeRate = result?.ExrateList?.Exrate;
        // Lấy thời gian cập nhật api của vietcombank
        const lastApiUpdate = result?.ExrateList?.DateTime;

        // Lưu dữ liệu vào database
        for (const exrate of exchangeRate) {
          const code: string = exrate?.$?.CurrencyCode;
          const currencyName = exrate?.$?.CurrencyName;
          const cashRate = exrate?.$?.Buy;
          const transferRate = exrate?.$?.Transfer;
          const sellRate = exrate?.$?.Sell;

          // Lưu dữ liệu vào database dùng upsert để vừa update vừa create nếu không tồn tại trong database
          await this.exchangeRateApiService.create({
            id: code,
            currency_name: currencyName,
            buy_rate: cashRate,
            transfer_rate: transferRate,
            sell_rate: sellRate,
          });
        }
        resolve(lastApiUpdate);
      });
    });
    // Lưu thời gian cập nhật cuối ở database và api của vietcombank vào database
    await this.exchangeRateApiTimeService.upsert({
      where: {
        id: 1,
      },
      update: {
        id: 1,
        api_update_at: lastApiUpdate[0],
        server_update_at: new Date().getTime().toString(),
      },
      create: {
        id: 1,
        api_update_at: lastApiUpdate[0],
        server_update_at: new Date().getTime().toString(),
      },
    });
    //
  }

  //Raw
  async exchangeRateRaw() {
    // Lấy dữ liệu tỷ giá từ database và  thời gian cập nhật cuối của api và server từ database
    const [exchangeRateRawData, exchangeRateRawUpdateTime] = await Promise.all([
      this.exchangeRateRawService.findAll(),
      this.exchangeRateRawTimeService.findUnique({
        id: 1,
      }),
    ]);

    if (!exchangeRateRawUpdateTime || !exchangeRateRawData) return;

    // Nếu thời gian thời gian hiện tại đã lớn hơn hoặc bằng thời gian cập nhật cuối của server thì cập nhật lại dữ liệu
    if (
      new Date().getTime() >=
      parseInt(exchangeRateRawUpdateTime?.server_update_at) + 600000
    )
      await this.updateExchangeRateRawToDb();

    return {
      //Trả về dữ liệu tỷ giá
      exchangeRateRawData: exchangeRateRawData,
      //Tạo ra thời gian cập nhật cuối của api
      lastApiUpdate: exchangeRateRawUpdateTime?.api_update_at,
      //Tạo ra thời gian cập nhật cuối của server
      lastServerUpdate: new Date(
        parseInt(exchangeRateRawUpdateTime?.server_update_at),
      ),
      //Tạo ra thời gian cập nhật tiếp theo của server
      nextServerUpdate: new Date(
        parseInt(exchangeRateRawUpdateTime?.server_update_at) + 600000,
      ),
    };
  }

  @Cron('* */10 * * * *')
  async updateExchangeRateRawToDb() {
    // Lấy thời gian cập nhật cuối của api và server từ database
    const exchangeRateRawUpdateTime =
      await this.exchangeRateRawTimeService.findUnique({
        id: 1,
      });

    // Nếu thời gian cập nhật cuối của server cách thời gian hiện tại dưới 10p thì không cập nhật
    if (
      new Date().getTime() <
      parseInt(exchangeRateRawUpdateTime?.server_update_at) + 600000
    )
      return;
    // Gọi lên api của vietcombank để lấy thông tin tỷ giá
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://www.vietcombank.com.vn/KHCN/Cong-cu-tien-ich/Ty-gia')
        .pipe(
          catchError(() => {
            throw new BadRequestException('Invalid request');
          }),
        ),
    );

    // Sử dụng cheerio để lấy dữ liệu từ html
    const $ = cheerio.load(data);

    // Lặp qua các phần tử li và lọc thông tin
    $('ul.dropdown-options-wrapper li').each((index, element) => {
      const item: any = {};

      // Lấy các thuộc tính dữ liệu từ phần tử
      item.code = $(element).attr('data-code');
      item.transferRate = $(element).attr('data-transfer-rate');
      item.sellRate = $(element).attr('data-sell-rate');
      item.cashRate = $(element).attr('data-cash-rate');

      // Lấy nội dung của thẻ span trong phần tử
      item.itemCode = $(element).find('.item-code').text();

      this.exchangeRateRawService.upsert({
        where: {
          id: item?.code,
        },
        update: {
          id: item?.code,
          currency_name: item?.itemCode,
          buy_rate: item?.cashRate,
          transfer_rate: item?.transferRate,
          sell_rate: item?.sellRate,
        },
        create: {
          id: item?.code,
          currency_name: item?.itemCode,
          buy_rate: item?.cashRate,
          transfer_rate: item?.transferRate,
          sell_rate: item?.sellRate,
        },
      });
    });

    // Lấy thời gian cập nhật cuối của api và server từ database
    $('div.currency__description-bottom strong').each((index, element) => {
      const item: any = {};
      item.lastApiUpdate = $(element).text();
      this.exchangeRateRawTimeService.upsert({
        where: {
          id: 1,
        },
        update: {
          id: 1,
          api_update_at: item?.lastApiUpdate,
          server_update_at: new Date().getTime().toString(),
        },
        create: {
          id: 1,
          api_update_at: item?.lastApiUpdate,
          server_update_at: new Date().getTime().toString(),
        },
      });
    });
  }
}
