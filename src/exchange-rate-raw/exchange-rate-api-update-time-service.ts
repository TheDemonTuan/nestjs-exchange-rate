import { PrismaService } from '../prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExchangeRateRawService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.exchangeRateRaw.findMany();
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
    where: Prisma.ExchangeRateRawWhereUniqueInput,
    select?: Prisma.ExchangeRateRawSelect,
  ) {
    try {
      return await this.prisma.exchangeRateRaw.findUnique({
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
    cursor?: Prisma.ExchangeRateRawWhereUniqueInput;
    where?: Prisma.ExchangeRateRawWhereInput;
    orderBy?: Prisma.ExchangeRateRawOrderByWithRelationInput;
  }) {
    const { skip, cursor, where, orderBy } = params;
    try {
      return await this.prisma.exchangeRateRaw.findFirst({
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
    cursor?: Prisma.ExchangeRateRawWhereUniqueInput;
    where?: Prisma.ExchangeRateRawWhereInput;
    orderBy?: Prisma.ExchangeRateRawOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.exchangeRateRaw.findMany({
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

  async create(data: Prisma.ExchangeRateRawCreateInput) {
    try {
      return await this.prisma.exchangeRateRaw.create({
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
    where: Prisma.ExchangeRateRawWhereUniqueInput;
    data: Prisma.ExchangeRateRawUpdateInput;
  }) {
    const { where, data } = params;
    try {
      return await this.prisma.exchangeRateRaw.update({
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
    where: Prisma.ExchangeRateRawWhereUniqueInput;
    create: Prisma.ExchangeRateRawCreateInput;
    update: Prisma.ExchangeRateRawUpdateInput;
  }) {
    const { where, create, update } = params;
    try {
      return await this.prisma.exchangeRateRaw.upsert({
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

  async deleteUser(where: Prisma.ExchangeRateRawWhereUniqueInput) {
    try {
      return await this.prisma.exchangeRateRaw.delete({
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
