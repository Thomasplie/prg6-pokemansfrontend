import {Link} from "react-router";

function Pokemon({pokemon}) {
    return (
        <article
            className="group p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 bg-white border-t-[16px] border-t-red-500 border-b-[16px] border-b-gray-200 border-y-[8px] border-y-black">

            <h2 className="text-2xl font-bold text-slate-800 line-clamp-2 text-center">
                {pokemon.name}
            </h2>

            <div className="text-slate-600 text-center">
                <div className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                    Type
                </div>
                <div className="text-base">{pokemon.type}</div>
            </div>

            <div className="text-slate-600 text-center">
                <div className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                    Description
                </div>
                <div className="text-base line-clamp-3">
                    {pokemon.pokedexDescription}
                </div>
            </div>

            <Link
                to={`/pokemon/${pokemon.id}`}
                className="text-center text-slate-800 hover:text-blue-400 transition-colors duration-200 mt-auto"
            >
                View details
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>

        </article>
    );
}

export default Pokemon;