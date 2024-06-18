import BookTable from "@/components/bookTable";
import BookForm from "../components/bookForm";
import {fetchBooks} from "@/utils/fetchBooks";
import {SaveBook} from "@/utils/saveBook";

export default async function Home() {

    const bookList = await fetchBooks();

    return(
        <>
            <div className="min-h-screen flex justify-center bg-gradient-to-r from-green-100 to-blue-400 p-6">
                <div className="container  flex flex-col gap-4">
                    <div className="p-4 text-lime-700 font-bold text-4xl font-serif">Book Library</div>
                     <div className="flex justify-center w-full">
                         <BookForm
                             isLoading={false}//here should be impe
                             handleSubmit={SaveBook}
                         ></BookForm>
                     </div>
                     <BookTable bookList={bookList}></BookTable>
                </div>
            </div>
        </>
    );
}


