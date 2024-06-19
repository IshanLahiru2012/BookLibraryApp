"use client"

import { Book, BookListProps } from "@/types/book"; // Importing necessary types
import React, { useEffect, useState } from "react"; // Importing React hooks
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // Importing sorting icons

type SortKey = keyof Book; // Defining SortKey type as keys of Book

// BookList component
const BookList = ({ bookList }: BookListProps) => {
    const [sortedBooks, setSortedBooks] = useState<Book[]>(bookList); // State for sorted books
    const [sortKey, setSortKey] = useState<keyof Book | null>(null); // State for the current sort key
    const [isAscending, setIsAscending] = useState<boolean>(true); // State for sort order
    const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
    const itemsPerPage = 5; // Number of items per page

    // Function to sort books based on key and order
    const sortBooks = (books: Book[], key: SortKey, ascending: boolean = true): Book[] => {
        return books.slice().sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];

            if (aValue === undefined || bValue === undefined) return 0;
            if (aValue.toString().toUpperCase() < bValue.toString().toUpperCase()) {
                return ascending ? -1 : 1;
            }
            if (aValue.toString().toUpperCase() > bValue.toString().toUpperCase()) {
                return ascending ? 1 : -1;
            }
            return 0;
        });
    };

    // Function to handle sort action
    const handleSort = (key: SortKey) => {
        const newAscending = sortKey === key ? !isAscending : true;
        const sorted = sortBooks(bookList, key, newAscending);
        setSortedBooks(sorted);
        setSortKey(key);
        setIsAscending(newAscending);
    };

    // Paginated list of books for the current page
    const currentBooks = sortedBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(sortedBooks.length / itemsPerPage); // Total number of pages

    // Function to get the sort icon based on the key
    const getSortIcon = (key: SortKey) => {
        if (sortKey !== key) {
            return <FaSort />;
        }
        return isAscending ? <FaSortUp /> : <FaSortDown />;
    };

    // Function to handle next page action
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to handle previous page action
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Effect to update sorted books when bookList changes
    useEffect(() => {
        setSortedBooks(bookList);
    }, [bookList]);

    // Render component
    return (
        <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                <tr>
                    <th
                        className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider"
                        onClick={() => handleSort('title')}
                    >
                        <div className="flex gap-2">Title {getSortIcon('title')}</div>
                    </th>
                    <th
                        className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                        onClick={() => handleSort('author')}
                    >
                        <div className="flex gap-2">Author {getSortIcon('author')}</div>
                    </th>
                </tr>
                </thead>
                <tbody className="text-gray-700">
                {currentBooks.length > 0 ? currentBooks.map((book, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap w-1/2">
                            <div className="text-md font-medium text-gray-900">{book.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap w-1/2">
                            <div className="text-md text-gray-800">{book.author}</div>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td className="px-6 py-4 text-right text-gray-500">No data available</td>
                    </tr>
                )}
                </tbody>
            </table>
            {currentBooks.length > 0 && (
                <div className="flex justify-center items-center px-6 py-2 gap-4 bg-cyan-100">
                    <button
                        className={`px-3 py-1 bg-gray-300 rounded ${currentPage === 1 ? '' : 'hover:bg-gray-200'}`}
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className={`px-3 py-1 bg-gray-300 rounded ${currentPage === totalPages ? '' : 'hover:bg-gray-200'}`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookList;
