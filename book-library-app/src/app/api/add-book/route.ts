import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import {Book} from "@/types/book";

const schema = z.object({
    title : z.string().min(1,'Title cannot be empty'),
    author : z.string().min(1,'Author cannot be empty'),
});
export async function POST(req:NextRequest):Promise<NextResponse>{
    try {
        const extractedBookData = await req.json();
        const parse = schema.safeParse(extractedBookData);

        if(!parse.success){
            console.error(parse.error.errors);
            return NextResponse.json({
                success: false,
                message: "Failed to add book! Please try again"
            });
        }
        const data = parse.data;
        const response = await fetch('http://localhost:3000/api/v1/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({
                success: false,
                message: errorData.message || "Something went wrong! Please try again",
            });
        }
        const createdBookData = await response.json();
        const createdBook : Book = createdBookData.data;
        return NextResponse.json({
            success: true,
            message: "Book added successfully",
            data: createdBook,
        });
    }catch (error){
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again"
        })
    }
}