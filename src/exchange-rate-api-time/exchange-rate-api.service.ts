import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ExchangeRateApiTimeService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    try {
      return await this.prisma.exchangeRateApiTime.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching exchange rate api',
        {
          cause: error,
        },
      );
    }
  }

  async findUnique(
    where: Prisma.ExchangeRateApiTimeWhereUniqueInput,
    select?: Prisma.ExchangeRateApiTimeSelect,
  ) {
    try {
      return await this.prisma.exchangeRateApiTime.findUnique({
        where,
        select,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching exchange rate api',
        {
          cause: error,
        },
      );
    }
  }

  public async findFirst(params: {
    skip?: number;
    cursor?: Prisma.ExchangeRateApiTimeWhereUniqueInput;
    where?: Prisma.ExchangeRateApiTimeWhereInput;
    orderBy?: Prisma.ExchangeRateApiTimeOrderByWithRelationInput;
  }) {
    const { skip, cursor, where, orderBy } = params;
    try {
      return await this.prisma.exchangeRateApiTime.findFirst({
        skip,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching exchange rate api ',
        {
          cause: error,
        },
      );
    }
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ExchangeRateApiTimeWhereUniqueInput;
    where?: Prisma.ExchangeRateApiTimeWhereInput;
    orderBy?: Prisma.ExchangeRateApiTimeOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.exchangeRateApiTime.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching exchange rate api',
        {
          cause: error,
        },
      );
    }
  }

  async create(data: Prisma.ExchangeRateApiTimeCreateInput) {
    try {
      return await this.prisma.exchangeRateApiTime.create({
        data,
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Error creating exchange rate api',
        {
          cause: error,
        },
      );
    }
  }

  async update(params: {
    where: Prisma.ExchangeRateApiTimeWhereUniqueInput;
    data: Prisma.ExchangeRateApiTimeUpdateInput;
  }) {
    const { where, data } = params;
    try {
      return await this.prisma.exchangeRateApiTime.update({
        data,
        where,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating exchange rate api',
        {
          cause: error,
        },
      );
    }
  }

  async upsert(params: {
    where: Prisma.ExchangeRateApiTimeWhereUniqueInput;
    create: Prisma.ExchangeRateApiTimeCreateInput;
    update: Prisma.ExchangeRateApiTimeUpdateInput;
  }) {
    const { where, create, update } = params;
    try {
      return await this.prisma.exchangeRateApiTime.upsert({
        create,
        update,
        where,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error upserting exchange rate api',
        {
          cause: error,
        },
      );
    }
  }

  async deleteUser(where: Prisma.ExchangeRateApiTimeWhereUniqueInput) {
    try {
      return await this.prisma.exchangeRateApiTime.delete({
        where,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error deleting exchange rate api',
        {
          cause: error,
        },
      );
    }
  }
}
