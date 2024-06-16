import BookTable from "@/components/book-table";

async function fetchBooks(){
    try {
        const apiResponse = await fetch("http://localhost:3001/api/get-books",{
            method: "GET",
            cache : "no-cache"
        });
        const result = await apiResponse.json();
        return result?.data;

    }catch (error){
        console.error('Error fetching books:', error);
    }
}
export default async function Home() {

    const bookList = await fetchBooks();
    console.log("bookList :",bookList);

    return(
        <>
            <div className="min-h-screen flex justify-center bg-gradient-to-r from-green-100 to-blue-400 p-6">
                 <div className="container  flex flex-col">
                     <BookTable bookList={bookList}></BookTable>
                </div>
            </div>
        </>
    );
}

