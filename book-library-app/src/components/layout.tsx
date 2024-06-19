import Header from "@/components/header"; // Importing Header component
import Footer from "@/components/footer"; // Importing Footer component
import { ReactNode } from "react"; // Importing ReactNode type from React

// Defining the interface for LayoutProps
interface LayoutProps {
    children: ReactNode; // children prop will contain ReactNode elements
}

// Layout component
const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-green-100 to-blue-400">
            {/* Container to hold Header, main content, and Footer */}
            <div className="w-full flex flex-grow flex-col gap-4">
                {/* Including the Header component */}
                <Header />

                {/* Main content area */}
                <main className="container justify-center mx-auto px-2 lg:px-8 py-4">
                    {children} {/* Rendering children elements */}
                </main>

                {/* Including the Footer component */}
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
