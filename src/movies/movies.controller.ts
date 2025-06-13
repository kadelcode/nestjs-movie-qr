// Import necessary decorators and classes from NestJS common module
import { Controller, Get, Param, NotFoundException } from "@nestjs/common";

// Import the QrService which will handle the business logic
import { QrService } from "src/qr/qr.service";

// The @Controller decorator marks this class as a NextJS controller
// and sets the base route path to '/movies'
@Controller('movies')
export class MoviesController {
    // The constructor injects an instance of QrService through dependency injection
    constructor(private readonly qrService: QrService) {}

    // @Get decorator defines a GET endpoint at '/movies/:token'
    // where :token is a route parameter
    @Get(':token')
    // The getMovies method handles incoming GET requests to the endpoint
    getMovies(@Param('token') token: string) {
        // Call the qrService to get movies associated with the provided token
        const movies = this.qrService.getMoviesByToken(token);

        // If no movies are found for the token, throw a NotFoundException
        // This will automatically return a 404 HTTP response
        if (!movies) throw new NotFoundException('Token expired or invalid');

        // If movies are found, return them (NestJS will automatically
        // serialize the response to JSON with status code 200)
        return movies;
    }
}