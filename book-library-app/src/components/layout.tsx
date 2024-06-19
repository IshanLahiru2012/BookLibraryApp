import Header from "@/components/header";
import Footer from "@/components/footer";
import {ReactNode} from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }:LayoutProps) => {
    return (
        <div className="flex min-h-screen  bg-gradient-to-r from-green-100 to-blue-400 ">
            <div className="w-full flex flex-grow  flex-col gap-4">
                <Header />
                <main className="container justify-center mx-auto px-10 py-4">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
