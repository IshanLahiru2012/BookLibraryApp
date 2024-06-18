"use client"
import {Book} from "@/types/book";

export async function SaveBook(book:Book){

    try {
        const apiResponse = await fetch("http://localhost:3000/api/add-book",{
            method: "POST",
            body : JSON.stringify(book),
            headers :{
                "Content-Type" : "application/json"
            }
        });
        if(!apiResponse.ok){
            throw new Error("Unable to save book");
        }
        console.log(apiResponse)
        return apiResponse.json();

    }catch (error){
        console.error('Error fetching books:', error);
    }
}