import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsDto } from 'src/dtos/contents.dto';
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  async getContents() {
    const data = await this.contentsService.findAll();
    return data;
  }
  @Post()
  async createContent(@Body() body: ContentsDto) {
    const res = await this.contentsService.create(body);
    return res;
  }
}
