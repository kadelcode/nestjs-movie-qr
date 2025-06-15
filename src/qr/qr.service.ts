import { Injectable } from "@nestjs/common";
import * as fs from 'fs'; // File system module for reading files
import * as path from 'path'; // Path module for handling file paths

@Injectable() // Marks this class as a provider that can be inject in NestJS
export class QrService {
    // Creates an in-memory cache using a Map to store temporary data
    // Key: token (string), Value: array of movies (any[])
    private tokenCache = new Map<string, any[]>();

    // Method to cache random movies associated with a token
    async cacheRandomMovies(token: string) {
        // Construct the path to the Film.JSON file
        // __dirname is the directory of the current module
        // '../../data/Film.json' goes up one level and into the data folder
        const filePath = path.join(__dirname, '..', 'data', 'Film.json');

        // Read and parse the JSON file containing film data
        const films = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Get 10 random movies:
        // 1. Shuffle the films array to randomize order
        // 2. Take the first 10 elements from the shuffled array
        const randomMovies = this.shuffle(films).slice(0, 10);

        // Store the random movies in cache with the token as key
        this.tokenCache.set(token, randomMovies);

        console.log(`Caching token: ${token} with ${randomMovies.length} movies`);
        console.log('Token cache now has:', this.tokenCache.size, 'items');

        // Set a timeout to automatically remove the cached data after 60 seconds
        // This prevents the cache from growing indefinitely
        setTimeout(() => this.tokenCache.delete(token), 5 * 60 * 1000); // 5 minutes
    }

    // Method to retrieve cache movies using a token
    getMoviesByToken(token: string): any[] | null {
        console.log('Looking up token:', token);
        console.log('All tokens in cache', Array.from(this.tokenCache.keys()));
        // Return the cached movies if token exists, otherwise return null
        return this.tokenCache.get(token) || null;
    }

    // Private helper method to shuffle an array (Fisher-Yates shuffle variation)
    private shuffle(array: any[]) {
        return array.sort(() => Math.random() - 0.5);
    }
}