// movies.module.ts
import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { QrService } from '../qr/qr.service';

@Module({
  controllers: [MoviesController],
  providers: [QrService],
  exports: [],
})
export class MoviesModule {}
