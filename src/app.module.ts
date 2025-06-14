import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QrModule } from './qr/qr.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [QrModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
