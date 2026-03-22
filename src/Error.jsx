import {Link} from "react-router";

function Error() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <img
                src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyY294bmI2bnNnbjRsNXRtcmJxNTdvcGZzajZ1dDNlNjI2Z3hrcHN5ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1WJjf5zyecZtvcPrlj/giphy.gif"
                alt="Error Message"
                className="w-64 md:w-80 mb-6 drop-shadow-lg"
            />

            <h1 className="text-5xl font-extrabold text-slate-900 mb-2">
                404
            </h1>

            <p className="text-xl text-slate-700 mb-6">
                Pokémon not found
            </p>

            <p className="text-slate-500 max-w-md mb-4">
                Looks like this Pokémon has disappeared… or never existed in the first place.
            </p>

            <Link
                to={`/pokemon`}
                className="mt-8 inline-block rounded-xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-700 transition"
            >
                <span className="group-hover:translate-x-1 transition-transform">
                    Flee the scene
                </span>
            </Link>
        </section>
    );
}

export default Error;