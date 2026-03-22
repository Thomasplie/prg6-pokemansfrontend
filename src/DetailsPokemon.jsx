import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";

function DetailsPokemon() {
    const params = useParams();

    const navigate = useNavigate();

    const [details, setDetails] = useState(null);

    // Delete
    const deletePokemon = async (id) => {
        try {
            await fetch(`http://localhost:3000/pokemon/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            });

            // Go back to the Pokémon list after deleting
            navigate("/pokemon");
        } catch (e) {
            console.log(e);
        }
    };

    // Load the details of one Pokémon from the backend
    const loadDetails = async (id) => {
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

            if (!result.ok) {
                throw new Error(`HTTP error! status: ${result.status}`);
            }

            // Save the Pokémon details in state
            const data = await result.json();
            setDetails(data);
            console.log(data);
        } catch (e) {
            console.log(e);
            navigate("/not-found", {replace: true});
        }
    };

    // Load the details when the page opens or when the id changes
    useEffect(() => {
        loadDetails(params.id);
    }, [params.id]);

    return (
        <main className="min-h-screen mx-auto max-w-7xl px-6 py-10 bg-gray-100">
            {details ? (
                <section className="p-6 bg-white rounded-2xl border border-slate-800 shadow-sm">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">
                        {details?.name ?? "No Pokémon found"}
                    </h1>

                    <h2 className="text-lg font-medium text-slate-600 mb-6">
                        Type: {details?.type ?? "Unknown"}
                    </h2>

                    <p className="text-slate-700 leading-relaxed mb-8">
                        Description: {details?.pokedexDescription ?? "No description available"}
                    </p>

                    <div className="flex row gap-1.5 pt-6">
                        {/* Go to the edit page */}
                        <Link
                            to={`/editPokemon/${details.id}`}
                            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                        >
                            EDIT
                        </Link>

                        {/* Delete the Pokémon */}
                        <button
                            onClick={() => deletePokemon(details.id)}
                            className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                        >
                            DELETE
                        </button>
                    </div>
                </section>
            ) : (
                <p className="text-center text-slate-600 text-lg animate-pulse">
                    Loading Pokémon details…
                </p>
            )}
        </main>
    );
}

export default DetailsPokemon;