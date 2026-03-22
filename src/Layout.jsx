import {Link, Outlet} from "react-router";

function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            {/* Navbar */}
            <header className="flex items-center gap-4 px-6 py-4 shadow" style={{backgroundColor: "#B71C1C"}}>
                <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                <span className="text-white text-2xl font-bold">Pokédex</span>
            </header>

            <nav className="flex gap-6 px-6 py-3" style={{backgroundColor: "#4CAF50"}}>
                <Link className="text-white font-semibold hover:text-blue-400 transition-colors duration-200" to={"/"}>
                    Home
                </Link>
                <Link
                    className="text-white font-semibold hover:text-blue-400 transition-colors duration-200"
                    to={"/createPokemon"}
                >
                    Add Pokémon
                </Link>
            </nav>

            {/* Main content */}
            <main className="flex-1 px-6 py-8">
                <div className="bg-gray-900 p-6 rounded-2xl">
                    <Outlet/>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-4 text-white text-sm" style={{backgroundColor: "#B71C1C"}}>
                Copyright Pokédex©
            </footer>
        </div>
    );
}

export default Layout;