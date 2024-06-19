"use client"
import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import BookForm from "@/components/bookForm";
import BookTable from "@/components/bookTable";
import Layout from "@/components/layout";


const Home = () => {
    const [bookList, setBookList] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] =useState(false)

    const handleFormClear = ()=>{
        setIsSubmitted(false);
    }
    const loadBooks = async ():Promise<Book[]> => {
        try {
            const apiResponse = await fetch("/api/get-books",{
                method: "GET"
            });
            if(!apiResponse.ok){
                console.log("unable to get books")
                alert("Failed to fetch books");
            }
            const result = await apiResponse.json();
            const booksList = result?.data || [];
            setBookList(booksList);
            return booksList;
        } catch (error) {
            console.error("Failed to fetch books:", error);
            alert("Failed to fetch books");
        }
        return [];
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
                console.log("unable to save book");
                alert("Failed to save book");
                return;
            }
            const updatedBooks = await loadBooks();
            setBookList(updatedBooks);
            setIsSubmitted(true);
            alert("SuccessFully book added");
        } catch (error) {
            console.error("Failed to save book:", error);
            alert("Failed to save book");
            throw new Error("Unable to save book");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await loadBooks();
        };
        fetchData().catch(error => console.error('Failed to fetch data:', error));
    }, []);

    return (
        <Layout>
            <div className="flex flex-col gap-8">
                <BookForm handleSubmit={handleSaveBook}
                          isLoading={isLoading}
                          isSubmitted={isSubmitted}
                          clearForm={handleFormClear}
                />
                <BookTable bookList={bookList} />
            </div>

        </Layout>

    );
};

export default Home;
