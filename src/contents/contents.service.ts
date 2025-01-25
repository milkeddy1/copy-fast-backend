import { Injectable } from '@nestjs/common';
import { ContentsDto } from 'src/dtos/contents.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentsService {
  constructor(private readonly prismaService: PrismaService) {}

  // 取的所有 contents
  async findAll() {
    const data = await this.prismaService.content.findMany();
    return data;
  }

  // 建立新的 content
  async create(data: ContentsDto) {
    const createdData = await this.prismaService.content.create({
      data: {
        ...data,
      },
    });

    return createdData;
  }
}
