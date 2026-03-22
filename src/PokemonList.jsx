import {useEffect, useState} from "react";
import Pokemon from "./Pokemon.jsx";

function PokemonList() {
    // Stores the list of Pokémon returned by the backend
    const [pokemons, setPokemons] = useState(null);

    // Stores the text typed into the search field
    const [searchTerm, setSearchTerm] = useState("");

    // Stores the selected Pokémon type from the dropdown
    const [selectedType, setSelectedType] = useState("");

    // Function to load Pokémon from the backend
    // It also sends search and type filters as query parameters
    const loadPokemons = async () => {
        try {
            // Create URLSearchParams so we can build query strings easily
            const params = new URLSearchParams();

            // If the user typed something in the search field,
            // add it to the URL as ?search=...
            if (searchTerm) {
                params.append("search", searchTerm);
            }

            // If the user selected a type,
            // add it to the URL as ?type=...
            if (selectedType) {
                params.append("type", selectedType);
            }

            // Build the final URL
            const url = `http://localhost:3000/pokemon${params.toString() ? `?${params.toString()}` : ""}`;

            const result = await fetch(url, {
                headers: {
                    Accept: "application/json",
                },
            });

            // If no Pokémon are found, set an empty array
            // so the page can still render nicely
            if (!result.ok) {
                setPokemons([]);
                return;
            }

            const data = await result.json();
            setPokemons(data.items);
            console.log(data);
        } catch (e) {
            console.log(e);
            setPokemons([]);
        }
    };

    // Runs when the page first loads
    // and again whenever searchTerm or selectedType changes
    useEffect(() => {
        loadPokemons();
    }, [searchTerm, selectedType]);

    return (
        <section className="mx-auto max-w-7xl pb-12">
            <h1 className="text-white font-bold text-4xl mt-4">Pokédex</h1>

            {/* Filter section */}
            <section className="mx-6 mt-6 mb-4 flex flex-col md:flex-row gap-4">
                {/* Search by name */}
                <input
                    type="text"
                    placeholder="Search Pokémon by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-lg px-4 py-2 border border-gray-300 bg-white text-black"
                />

                {/* Filter by type */}
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="rounded-lg px-4 py-2 border border-gray-300 bg-white text-black"
                >
                    <option value="">All types</option>
                    <option value="Grass">Grass</option>
                    <option value="Fire">Fire</option>
                    <option value="Water">Water</option>
                    <option value="Electric">Electric</option>
                    <option value="squirrel">squirrel</option>
                    <option value="rabbit">rabbit</option>
                    <option value="kangaroo">kangaroo</option>
                    <option value="rhinoceros">rhinoceros</option>
                </select>
            </section>

            {/* Pokémon list */}
            {pokemons ? (
                pokemons.length > 0 ? (
                    <section className="mx-6 grid gap-4 py-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                        {pokemons.map((pokemon) => (
                            <Pokemon key={pokemon.id} pokemon={pokemon}/>
                        ))}
                    </section>
                ) : (
                    <p className="text-white mx-6 mt-4">No Pokémon found.</p>
                )
            ) : (
                <p className="text-white mx-6 mt-4">Loading Pokémon… please wait!</p>
            )}
        </section>
    );
}

export default PokemonList;