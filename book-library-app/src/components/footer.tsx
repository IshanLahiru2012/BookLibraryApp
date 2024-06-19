const Footer = () => {
    return (
        <footer className="flex bg-blue-500 justify-center text-white p-4 mt-auto">
            <p>&copy; {new Date().getFullYear()} My Book Library Website</p>
        </footer>
    );
};

export default Footer;