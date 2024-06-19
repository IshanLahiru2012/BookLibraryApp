import {NextResponse} from "next/server";
import {Book} from "@/types/book";

export async function GET(): Promise<NextResponse> {
    const API_BASE_URL = process.env.API_BASE_URL;
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/books`, {
            method: 'GET',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({
                success: false,
                message: errorData.message || "Something went wrong! Please try again",
            });
        }

        const books: Book[] = await response.json();

        return NextResponse.json({
            success: true,
            message: "Books fetched successfully",
            data: books,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again",
        });
    }
}