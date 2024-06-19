import Header from "@/components/header";
import Footer from "@/components/footer";
import {ReactNode} from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }:LayoutProps) => {
    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-r from-green-100 to-blue-400 ">
            <div className="container flex flex-col gap-4">
                <Header />
                <main className="flex-grow p-4">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
