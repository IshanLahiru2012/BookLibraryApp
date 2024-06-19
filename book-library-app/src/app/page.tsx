"use client"
import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import BookForm from "@/components/bookForm";
import BookTable from "@/components/bookTable";


const HomePage = () => {
    const [bookList, setBookList] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] =useState(false)

    const handleFormClear = ()=>{
        setIsSubmitted(false);
    }
    const loadBooks = async () => {
        try {
            const apiResponse = await fetch("/api/get-books");
            if(!apiResponse.ok){
                console.log("unable to get books")
                throw new Error("Unable to get book");
            }
            const result = await apiResponse.json();
            const booksList = result?.data || [];
            setBookList(booksList);
            return booksList;
        } catch (error) {
            console.error("Failed to fetch books:", error);
        }
    };

    const handleSaveBook = async (book: Book) => {
        setIsLoading(true);
        try {
            const apiResponse = await fetch("/api/add-book",{
                method: "POST",
                body : JSON.stringify(book),
                headers:{
                    "Content-Type": "application/json"
                }
            });
            if(!apiResponse.ok){
                console.log("unable to save book")
                throw new Error("Unable to save book");
            }
            const updatedBooks = await loadBooks();
            setBookList(updatedBooks);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Failed to save book:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-r from-green-100 to-blue-400 p-6">
            <div className="container flex flex-col gap-4">
                <div className="p-4 text-lime-700 font-bold text-4xl font-serif">
                    Book Library
                </div>
                <div className="flex justify-center w-full">
                    <BookForm handleSubmit={handleSaveBook}
                              isLoading={isLoading}
                              isSubmitted={isSubmitted}
                              clearForm={handleFormClear}
                    />
                </div>
                <BookTable bookList={bookList} />
            </div>
        </div>
    );
};

export default HomePage;
