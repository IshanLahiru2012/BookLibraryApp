import { Book } from "@/types/book";

interface BookListProps {
    bookList: Book[];
}

const BookList = ({ bookList }: BookListProps) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                            Author
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">

                {bookList && bookList?.map((book, index) => (
                    <tr key={book.id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{book.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{book.author}</div>
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
        </div>
    );
};

export default BookList;

