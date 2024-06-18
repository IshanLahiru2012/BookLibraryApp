"use client"

import {useState} from "react";
import {Book} from "@/types/book";

interface AddBookProps {
    handleSubmit: (book : Book)=> void;
    isLoading : boolean;
}
const initialBookForm ={title:"",author:""};
const initialValidationErrors = { title: '', author: '' };


const AddBook = ({handleSubmit,isLoading}:AddBookProps) =>{

    const [bookFormData, setBookFormData] =useState(initialBookForm);
    const [validationErrors, setValidationErrors] = useState(initialValidationErrors);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBookFormData({ ...bookFormData, [name]: value });

        setValidationErrors({
            ...validationErrors,
            [name]: value ? ''||undefined : `${name} is required.`,
        });
    };
    const onSubmit = ()=>{
        if(!bookFormData.title){
            setValidationErrors({...validationErrors,title: "Title is required"});
            return;
        };
        if(!bookFormData.author){
            setValidationErrors({...validationErrors,author: "Author is required"});
            return;
        }
        handleSubmit(bookFormData);
    }


    return(
        <>
            <form className="flex flex-col w-full p-6 bg-gray-50 rounded-lg shadow-lg">
                <div className="space-y-6">
                    <div className="flex flex-col items-left space-y-2">
                        <label htmlFor="title" className="w-1/4 text-left font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            name="title"
                            placeholder="Enter Book title"
                            value={bookFormData.title}
                            required
                            onChange={handleChange}
                            id="title"
                            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {validationErrors.title && (
                            <span className="text-red-500 text-sm">{validationErrors.title}</span>
                        )}
                    </div>
                    <div className="flex flex-col items-left space-y-2">
                        <label htmlFor="author" className="text-left font-medium text-gray-700">
                            Author
                        </label>
                        <input
                            name="author"
                            placeholder="Enter Book Author"
                            value={bookFormData.author}
                            required
                            onChange={handleChange}
                            id="author"
                            className=" p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {validationErrors.author && (
                            <span className="text-red-500 text-sm">{validationErrors.author}</span>
                        )}
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button
                        onClick={onSubmit}
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700"
                    >
                        {isLoading ? "Saving" : "Save Book"}
                    </button>
                </div>
            </form>
        </>

    );
}

export default AddBook;


// import { useState } from "react";
//
// interface AddBookProps {
//     handleSubmit: (formData: { title: string; author: string }) => void;
// }
//
// const initialBookForm = { title: "", author: "" };
//
// const AddBook = ({ handleSubmit }: AddBookProps) => {
//     const [bookFormData, setBookFormData] = useState(initialBookForm);
//     const [isLoading, setIsLoading] = useState(false);
//     const [errors, setErrors] = useState<{ title?: string; author?: string }>(
//         {}
//     );
//
//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setBookFormData({
//             ...bookFormData,
//             [event.target.name]: event.target.value,
//         });
//         setErrors({ ...errors, [event.target.name]: undefined }); // Clear error on change
//     };
//
//     const validateForm = (): boolean => {
//         const newErrors = {} as { title?: string; author?: string };
//
//         if (!bookFormData.title) {
//             newErrors.title = "Title is required.";
//         }
//         if (!bookFormData.author) {
//             newErrors.author = "Author is required.";
//         }
//
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0; // Return true if no errors
//     };
//
//     const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//
//         if (!validateForm()) {
//             return; // Don't submit if form is invalid
//         }
//
//         setIsLoading(true);
//
//         try {
//             // Use your client-side logic here, potentially making an API call
//             // This is a placeholder for illustration purposes
//             const response = await fetch("/api/books", {
//                 method: "POST",
//                 body: JSON.stringify(bookFormData), // Assuming an API endpoint for books
//             });
//
//             if (!response.ok) {
//                 throw new Error("Failed to save book.");
//             }
//
//             console.log("Book saved successfully!"); // Handle successful submission
//
//         } catch (error) {
//             console.error("Error saving book:", error); // Handle errors
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     return (
//         <>
//             <form onSubmit={handleFormSubmit} className="flex flex-col w-full p-6 bg-gray-50 rounded-lg shadow-lg">
//                 <div className="space-y-6">
//                     <div className="flex flex-col items-left space-y-2">
//                         <label htmlFor="title" className="w-1/4 text-left font-medium text-gray-700">
//                             Title
//                         </label>
//                         <input
//                             name="title"
//                             placeholder="Enter Book title"
//                             value={bookFormData.title}
//                             required
//                             onChange={handleChange}
//                             id="title"
//                             className={`p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : ""}`} // Add error class
//                         />
//                         {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>} {/* Display error message */}
//                     </div>
//                     <div className="flex flex-col items-left space-y-2">
//                         <label htmlFor="author" className="text-left font-medium text-gray-700">
//                             Author
//                         </label>
//                         <input
//                             name="author"
//                             placeholder="Enter Book Author"
//                             value={bookFormData.author}
//                             onChange={handleChange}
//                             id="author"
//                             className={` p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.author ? "border-red-500" : ""}`} // Add error class
//                         />
//                         {errors.author && <span className="text-red-500 text-sm">{errors.author}</span>} {/* Display error message */}
//                     </div>
//                 </div>
//                 <div className="mt-6 text-right">
//                     <button
//                          // onClick={handleSubmit}
//                          type="button"
//                          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700"
//                      >
//                          {isLoading ? "Saving" : "Save Book"}
//                      </button>
//                  </div>
//              </form>
//          </>
//
//      );
//  }
//
// export default AddBook;
