"use client"
import { Book } from "@/types/book";
import React, {useState} from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface BookListProps {
    bookList: Book[];
}

const BookList = ({ bookList }: BookListProps) => {

    const [sortedBooks, setSortedBooks] = useState<Book[]>(bookList);
    const [sortKey, setSortKey] = useState<keyof Book | null>(null);
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    type SortKey = keyof Book;

    const sortBooks = (books: Book[], key: SortKey, ascending: boolean = true): Book[] => {
        return books.slice().sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];

            if (aValue === undefined || bValue === undefined) {
                return 0;
            }

            if (aValue < bValue) {
                return ascending ? -1 : 1;
            }
            if (aValue > bValue) {
                return ascending ? 1 : -1;
            }
            return 0;
        });
    };

    const handleSort = (key: SortKey) => {
        const newAscending = sortKey === key ? !isAscending : true;
        const sorted = sortBooks(bookList, key, newAscending);
        setSortedBooks(sorted);
        setSortKey(key);
        setIsAscending(newAscending);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const currentBooks = sortedBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);

    const getSortIcon = (key: SortKey) => {
        if (sortKey !== key) {
            return <FaSort />;
        }
        return isAscending ? <FaSortUp /> : <FaSortDown />;
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th
                            className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
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

                {currentBooks && currentBooks?.map((book, index) => (
                    <tr key={book.id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-md font-medium text-gray-900">{book.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-md text-gray-800">{book.author}</div>
                        </td>
                    </tr>
                ))}
                {!bookList &&
                    <tr>
                        <td className="px-6 py-4 text-center text-gray-500">No data available</td>
                    </tr>
                }
                </tbody>
            </table>
            <div className="flex justify-center items-center px-6 py-4 gap-4">
                <button
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => handlePreviousPage()}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => handleNextPage()}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BookList;

