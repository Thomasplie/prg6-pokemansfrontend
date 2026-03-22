import {useState} from "react";
import {useNavigate} from "react-router";

function CreatePokemon() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        pokedexDescription: "",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/pokemon", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    type: formData.type,
                    pokedexDescription: formData.pokedexDescription,
                }),
            });

            if (!response.ok) {
                throw new Error("Create failed");
            }

            const result = await response.json();
            console.log("New Pokémon created:", result);
            navigate("/pokemon"); // Back to Pokémon list
        } catch (error) {
            console.error("An error occurred", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col gap-6"
        >
            <h1 className="text-3xl font-bold text-slate-900">Add a Pokémon</h1>

            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="type" className="text-sm font-semibold text-slate-700">
                    Type
                </label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label
                    htmlFor="pokedexDescription"
                    className="text-sm font-semibold text-slate-700"
                >
                    Description
                </label>
                <input
                    type="text"
                    id="pokedexDescription"
                    name="pokedexDescription"
                    value={formData.pokedexDescription}
                    onChange={handleInputChange}
                    className="rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
            </div>

            <div
                className="mt-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 self-start">
                <button type="submit">Add</button>
            </div>
        </form>
    );
}

export default CreatePokemon;