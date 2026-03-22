import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";

function EditPokemon() {
    const params = useParams();
    const navigate = useNavigate();

    const [editPokemon, setEditPokemon] = useState(null);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditPokemon({
            ...editPokemon,
            [name]: value,
        });
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/pokemon/${params.id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: editPokemon.name,
                    pokedexDescription: editPokemon.pokedexDescription,
                    type: editPokemon.type,
                }),
            });

            const data = await response.json();
            console.log("Form submitted", data);
            navigate(`/pokemon/${data.id}`);
        } catch (error) {
            console.error("An error occurred", error);
        }
    };

    const loadEditPokemon = async (id) => {
        try {
            const result = await fetch(`http://localhost:3000/pokemon/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });

            if (result.status === 404) {
                navigate("/not-found", {replace: true});
                return;
            }

            const data = await result.json();
            setEditPokemon(data);
            console.log(data);
        } catch (e) {
            console.log(e);
            navigate("/not-found", {replace: true});
        }
    };

    useEffect(() => {
        loadEditPokemon(params.id);
    }, [params.id]);

    if (!editPokemon) {
        return <p>Loading...</p>;
    }

    return (
        <form
            onSubmit={handleEditSubmit}
            className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col gap-6"
        >
            <h1 className="text-3xl font-bold text-slate-900">Edit Pokémon</h1>

            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={editPokemon.name}
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
                    value={editPokemon.type}
                    onChange={handleInputChange}
                    className="rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="pokedexDescription" className="text-sm font-semibold text-slate-700">
                    Description
                </label>
                <input
                    type="text"
                    id="pokedexDescription"
                    name="pokedexDescription"
                    value={editPokemon.pokedexDescription}
                    onChange={handleInputChange}
                    className="rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
            </div>

            <div
                className="mt-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 self-start">
                <button type="submit">Change</button>
            </div>
        </form>
    );
}

export default EditPokemon;