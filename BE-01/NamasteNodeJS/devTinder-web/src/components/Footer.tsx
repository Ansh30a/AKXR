const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-300 text-neutral-content shrink-0 items-center p-4">
            <aside className="grid-flow-col items-center">
                <img src="/logo.svg" style={{ height: "36px" }} />
                <p>
                    DevTinder Copyright © {new Date().getFullYear()} - All right
                    reserved
                </p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a href="https://github.com/Ansh30a" target="blank" className="text-white hover:text-gray-300">
                    <img src="/github.svg" className="fill-current w-6 h-6"/>
                </a>
            </nav>
        </footer>
    );
};

export default Footer;
