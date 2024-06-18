import {Book} from "@/types/book";


export async function fetchBooks(){
    try {
        const apiResponse = await fetch("http://localhost:3000/api/get-books",{
            method: "GET",
            cache : "no-cache"
        });
        const result = await apiResponse.json();
        return result?.data;

    }catch (error){
        console.error('Error fetching books:', error);
    }
}