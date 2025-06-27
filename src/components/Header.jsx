import header from "../assets/header.jpeg";

const Header = () => {
    return (
        <header className="cursor-pointer z-50 w-full bg-gray-700 p-4 pl-5 shadow">
            <div className="mx-auto flex max-w-6xl items-center" onClick={() => window.location.href = "/"}>
                <img src={header} alt="Header Icon" className="m-1 h-10 w-10 rounded-full" />
                <h1 className="text-xl font-semibold text-white m-1">
                    Anime Explorer
                </h1>
            </div>
        </header>

    );
};

export default Header;