import { NextResponse } from "next/server"; // Importing NextResponse from next/server to handle responses
import { Book } from "@/types/book"; // Importing the Book type from the types directory

// Defining an async function to handle GET requests
export async function GET(): Promise<NextResponse> {
    const API_BASE_URL = process.env.API_BASE_URL; // Retrieving the API base URL from environment variables

    try {
        // Making a GET request to the external API to fetch books
        const response = await fetch(`${API_BASE_URL}/api/v1/books`, {
            method: 'GET', // Specifying the request method as GET
            cache: "no-cache", // Disabling caching for the request
            headers: {
                'Content-Type': 'application/json', // Setting the Content-Type header to application/json
            },
        });

        // Checking if the response status is not OK
        if (!response.ok) {
            const errorData = await response.json(); // Extracting error data from the response
            return NextResponse.json({
                success: false,
                message: errorData.message || "Something went wrong! Please try again",
            }, { status: 400 }); // Returning a JSON response with a 400 status code for client errors
        }

        const books: Book[] = await response.json(); // Extracting the book data from the response

        // Returning a JSON response with the fetched book data and a 200 status code for success
        return NextResponse.json({
            success: true,
            message: "Books fetched successfully",
            data: books,
        }, { status: 200 });

    } catch (error) {
        console.error(error); // Logging any errors that occur during the process

        // Returning a JSON response with a 500 status code for server errors
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again",
        }, { status: 500 });
    }
}
