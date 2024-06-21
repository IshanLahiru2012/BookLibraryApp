import { NextRequest, NextResponse } from "next/server";  // Importing necessary modules from next/server
import { z } from "zod";  // Importing zod for schema validation

// Defining a schema for book data using zod for validation
const schema = z.object({
    title: z.string().min(2, 'Title cannot be empty'),  // Title must be a string with at least 2 characters
    author: z.string().min(1, 'Author cannot be empty'),  // Author must be a string with at least 1 character
});

// Exporting an async function to handle POST requests
export async function POST(req: NextRequest): Promise<NextResponse> {
    const API_BASE_URL = process.env.API_BASE_URL;  // Retrieving the API base URL from environment variables

    try {
        const extractedBookData = await req.json();  // Extracting the JSON data from the request body

        // Validating the extracted data against the defined schema
        const parse = schema.safeParse(extractedBookData);

        // If validation fails, log the errors and return a 400 response with an error message
        if (!parse.success) {
            console.error(parse.error.errors);
            return NextResponse.json({
                success: false,
                message: "Failed to add book! Please try again"
            }, { status: 400 });
        }

        const data = parse.data;  // Extracting the valid data from the parsed result

        // Sending a POST request to the external API to create the book
        const response = await fetch(`${API_BASE_URL}/api/v1/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),  // Sending the validated data in the request body
        });

        const createdBook = await response.json();  // Extracting the JSON response from the external API
        console.log(response);
        console.log(createdBook)
        // If the response from the external API is not OK, return an error response with the appropriate message
        if (!response.ok) {
            return NextResponse.json({
                success: false,
                message: createdBook.message || "Something went wrong! Please try again",
            }, { status: 501 });
        }

        // Returning a success response with the created book data and status 201
        return NextResponse.json({
            success: true,
            message: "Book added successfully",
            data: createdBook,
        }, { status: 201 });

    } catch (error) {
        console.log(error);  // Logging any errors that occur during the process

        // Returning an error response if any exceptions occur
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again"
        },{ status: 500 });
    }
}
