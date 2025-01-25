import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsDto } from 'src/dtos/contents.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @UseGuards(AuthGuard) // request guard
  @ApiBearerAuth() // swagger guard
  @Get()
  async getContents() {
    const data = await this.contentsService.findAll();
    return data;
  }

  @UseGuards(AuthGuard) // request guard
  @ApiBearerAuth() // swagger guard
  @Post()
  async createContent(@Body() body: ContentsDto) {
    const res = await this.contentsService.create(body);
    return res;
  }
}
