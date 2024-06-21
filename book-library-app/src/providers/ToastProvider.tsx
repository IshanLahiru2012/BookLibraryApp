import {ToastContainer} from "react-toastify";
import {ReactNode} from "react";
import 'react-toastify/dist/ReactToastify.css';

interface ToastProviderProps {
    children: ReactNode;
}
const ToastProvider = ({children}:ToastProviderProps)=>{
    return(
        <>
            {children}
            <ToastContainer/>
        </>
    )
}

export default ToastProvider;