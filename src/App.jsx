import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";
import PokemonList from "./PokemonList.jsx";
import DetailsPokemon from "./DetailsPokemon.jsx";
import EditPokemon from "./EditPokemon.jsx";
import CreatePokemon from "./CreatePokemon.jsx";
import Error from "./Error.jsx";
// import other components if needed

const router = createBrowserRouter([
    {
        element: <Layout/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <PokemonList/>,
            },
            {
                path: "/pokemon",
                element: <PokemonList/>,
            },
            {
                path: "/pokemon/:id",
                element: <DetailsPokemon/>,
            },
            {
                path: "/createPokemon",
                element: <CreatePokemon/>,
            },
            {
                path: "/editPokemon/:id",
                element: <EditPokemon/>,
            },
            {
                path: "/not-found",
                element: <Error/>,
            },
            {
                path: "*",
                element: <Error/>,
            }
        ],
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;