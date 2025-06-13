// Import the Module decorator from NestJS common utilities
// This decorator is used to define and organize application components
import { Module } from '@nestjs/common';

// Import the controller that will handle HTTP request for QR-related operations
import { QrController } from './qr.controller';

// Import the service that will contain business logic for QR operations
import { QrService } from './qr.service';

// The @Module decorator defines a module in NestJS
// Modules are used to organize the application into cohesive blocks of functionality
@Module({
  // The controllers array lists all controllers that belong to this module
  // Controllers handle incoming HTTP requests and return responses
  controllers: [QrController],

  // The providers array lists services and other injectable classes
  // Providers can be injected into controllers or other providers
  // QrService will be available for dependency injection throughout this module
  providers: [QrService],
})

// Export the module class so it can be imported by other modules
export class QrModule {}
