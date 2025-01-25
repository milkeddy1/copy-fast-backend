import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ContentsController } from './contents/contents.controller';
import { ContentsService } from './contents/contents.service';

@Module({
  imports: [],
  controllers: [AppController, ContentsController],
  providers: [AppService, PrismaService, ContentsService],
})
export class AppModule {}
