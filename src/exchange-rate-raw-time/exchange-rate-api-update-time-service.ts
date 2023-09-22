import { PrismaService } from '../prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExchangeRateRawTimeService {
  constructor(private prisma: PrismaService) {}

  async findUnique(
    where: Prisma.ExchangeRateRawTimeWhereUniqueInput,
    select?: Prisma.ExchangeRateRawTimeSelect,
  ) {
    try {
      return await this.prisma.exchangeRateRawTime.findUnique({
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
    cursor?: Prisma.ExchangeRateRawTimeWhereUniqueInput;
    where?: Prisma.ExchangeRateRawTimeWhereInput;
    orderBy?: Prisma.ExchangeRateRawTimeOrderByWithRelationInput;
  }) {
    const { skip, cursor, where, orderBy } = params;
    try {
      return await this.prisma.exchangeRateRawTime.findFirst({
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
    cursor?: Prisma.ExchangeRateRawTimeWhereUniqueInput;
    where?: Prisma.ExchangeRateRawTimeWhereInput;
    orderBy?: Prisma.ExchangeRateRawTimeOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.exchangeRateRawTime.findMany({
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

  async create(data: Prisma.ExchangeRateRawTimeCreateInput) {
    try {
      return await this.prisma.exchangeRateRawTime.create({
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
    where: Prisma.ExchangeRateRawTimeWhereUniqueInput;
    data: Prisma.ExchangeRateRawTimeUpdateInput;
  }) {
    const { where, data } = params;
    try {
      return await this.prisma.exchangeRateRawTime.update({
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
    where: Prisma.ExchangeRateRawTimeWhereUniqueInput;
    create: Prisma.ExchangeRateRawTimeCreateInput;
    update: Prisma.ExchangeRateRawTimeUpdateInput;
  }) {
    const { where, create, update } = params;
    try {
      return await this.prisma.exchangeRateRawTime.upsert({
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

  async deleteUser(where: Prisma.ExchangeRateRawTimeWhereUniqueInput) {
    try {
      return await this.prisma.exchangeRateRawTime.delete({
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
