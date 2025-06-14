// movies.module.ts
import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
// import { QrService } from '../qr/qr.service'; // Import the shared service
import { QrModule } from 'src/qr/qr.module';

// '@Module' decorator used to define a NestJs module
@Module({
  controllers: [MoviesController], // Controllers that belong to this module
  providers: [], // Providers that will be instantiated by the NestJS injector
  exports: [], // This array lists the subset of providers that should be available to other modules
  imports: [QrModule] // This array lists the modules that are required by this module
})

// The 'MoviesModule' class is defined and exported
// This class serves as the module configuration container.
export class MoviesModule {}
