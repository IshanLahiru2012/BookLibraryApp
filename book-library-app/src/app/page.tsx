"use client"

import { useState, useEffect } from "react"; // Importing React hooks for state and effect management
import { Book } from "@/types/book"; // Importing the Book type
import BookForm from "@/components/bookForm"; // Importing the BookForm component
import BookTable from "@/components/bookTable"; // Importing the BookTable component
import Layout from "@/components/layout"; // Importing the Layout component

// The main Home component
const Home = () => {
    // State for storing the list of books
    const [bookList, setBookList] = useState<Book[]>([]);
    // State for loading indicator
    const [isLoading, setIsLoading] = useState(false);
    // State to check if the form is submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Function to reset the form submission state
    const handleFormClear = () => {
        setIsSubmitted(false);
    };

    // Function to fetch the list of books from the API
    const loadBooks = async (): Promise<Book[]> => {
        try {
            const apiResponse = await fetch("/api/get-books", {
                method: "GET"
            });
            if (!apiResponse.ok) {
                console.log("Unable to get books");
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

    // Function to save a new book using the API
    const handleSaveBook = async (book: Book) => {
        setIsLoading(true);
        try {
            const apiResponse = await fetch("/api/add-book", {
                method: "POST",
                body: JSON.stringify(book),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!apiResponse.ok) {
                console.log("Unable to save book");
                alert("Failed to save book");
                return;
            }
            const updatedBooks = await loadBooks(); // Reload the book list after saving
            setBookList(updatedBooks);
            setIsSubmitted(true);
            alert("Successfully added book");
        } catch (error) {
            console.error("Failed to save book:", error);
            alert("Failed to save book");
            throw new Error("Unable to save book");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // Effect to load books when the component is mounted
    useEffect(() => {
        const fetchData = async () => {
            await loadBooks();
        };
        fetchData().catch(error => console.error('Failed to fetch data:', error));
    }, []);

    // Rendering the Home component
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
