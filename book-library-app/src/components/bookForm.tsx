"use client"

import React, {useEffect, useState} from "react";
import {Book} from "@/types/book";

interface AddBookProps {
    handleSubmit: (book : Book)=> void;
    isLoading : boolean;
    isSubmitted: boolean;
    clearForm: ()=> void;
}
const initialBookForm ={title:"",author:""};
const initialValidationErrors = { title: '', author: '' };


const AddBook = ({handleSubmit,isLoading, isSubmitted,clearForm}:AddBookProps) =>{

    const [bookFormData, setBookFormData] =useState(initialBookForm);
    const [validationErrors, setValidationErrors] = useState(initialValidationErrors);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBookFormData({ ...bookFormData, [name]: value });

        if (value) {
            setValidationErrors({ ...validationErrors, [name]: "" });
        } else {
            setValidationErrors({ ...validationErrors, [name]: `${name} is required.` });
        }
    };
    const validateForm = () => {
        const errors = { title: "", author: "" };
        let isValid = true;

        if (!bookFormData.title) {
            errors.title = "Title is required.";
            isValid = false;
        }
        if (!bookFormData.author) {
            errors.author = "Author is required.";
            isValid = false;
        }
        setValidationErrors(errors);
        return isValid;
    };
    const onSubmit = ()=>{
        if (validateForm() && !isLoading) {
            handleSubmit(bookFormData);
        }
    }
    useEffect(()=>{
        if(isSubmitted){
            setBookFormData(initialBookForm);
            clearForm();
        }
    },[isSubmitted,clearForm])

    return(
        <>
            <form className="flex flex-col w-full p-6 bg-gray-200 rounded-lg shadow-lg">
                <div className="space-y-6">
                    <div className="font-bold text-3xl font-serif">Book Details</div>
                    <div className="flex flex-col items-left space-y-2">
                        <label htmlFor="title" className="w-1/4 text-left font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            name="title"
                            placeholder="Enter Book title"
                            value={bookFormData.title}
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
