// Import necessary modules and decorators from NestJS and external libraries
import { Controller, Get } from "@nestjs/common"; // NestJS decorators for creating controllers
import * as QRCode from 'qrcode'; // Library for generating QR codes
import { v4 as uuidv4 } from 'uuid'; // Library for generating unique identifiers
import { QrService } from "./qr.service"; // Import the QrService for business logic

// Define a controller with the route prefix '/qr'
@Controller('qr')
export class QrController {
    // Inject the QrService through dependency injection
    constructor(private readonly qrService: QrService) {}

    // Define a GET endpoint to '/qr' that returns a QR code and a token
    @Get()
    async getQrCode(): Promise<{ qrCodeDataURL: string; token: string  }> {
        // Generate a unique token using UUID v4
        const token = uuidv4();

        // Cache random movies associated with this token using the QrService
        // This is presumably for later retrieval when the QR code is scanned
        await this.qrService.cacheRandomMovies(token);

        // Generate a QR code that points to a local URL with the token as a parameter
        // The URL would presumably be used to retrieve the cached movies
        const qrCodeDataURL = await QRCode.toDataURL(
            `http://localhost:3000/viewer.html?token=${token}`
        )

        // Return both the QR code (as a data URL) and the token to the client
        return { qrCodeDataURL, token };
    }
}