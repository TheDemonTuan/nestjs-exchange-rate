import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ExchangeRateApiService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    try {
      return await this.prisma.exchangeRateApi.findMany();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error fetching all exchange rate api',
        {
          cause: error,
        },
      );
    }
  }

  async findUnique(
    where: Prisma.ExchangeRateApiWhereUniqueInput,
    select?: Prisma.ExchangeRateApiSelect,
  ) {
    try {
      return await this.prisma.exchangeRateApi.findUnique({
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
    cursor?: Prisma.ExchangeRateApiWhereUniqueInput;
    where?: Prisma.ExchangeRateApiWhereInput;
    orderBy?: Prisma.ExchangeRateApiOrderByWithRelationInput;
  }) {
    const { skip, cursor, where, orderBy } = params;
    try {
      return await this.prisma.exchangeRateApi.findFirst({
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
    cursor?: Prisma.ExchangeRateApiWhereUniqueInput;
    where?: Prisma.ExchangeRateApiWhereInput;
    orderBy?: Prisma.ExchangeRateApiOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.exchangeRateApi.findMany({
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

  async create(data: Prisma.ExchangeRateApiCreateInput) {
    try {
      return await this.prisma.exchangeRateApi.create({
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
    where: Prisma.ExchangeRateApiWhereUniqueInput;
    data: Prisma.ExchangeRateApiUpdateInput;
  }) {
    const { where, data } = params;
    try {
      return await this.prisma.exchangeRateApi.update({
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
    where: Prisma.ExchangeRateApiWhereUniqueInput;
    create: Prisma.ExchangeRateApiCreateInput;
    update: Prisma.ExchangeRateApiUpdateInput;
  }) {
    const { where, create, update } = params;
    try {
      return await this.prisma.exchangeRateApi.upsert({
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

  async deleteUser(where: Prisma.ExchangeRateApiWhereUniqueInput) {
    try {
      return await this.prisma.exchangeRateApi.delete({
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
