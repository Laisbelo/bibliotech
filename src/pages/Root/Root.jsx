
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";

//Layout principal do App com Navbar fixa
//As páginas com Navbar fixa: home, livros, empréstimo e etc
export function Root(){
    const usuarioLogado = useContext(AuthContext)

    if(usuarioLogado===null){
        //se esta deslogado redireciona para a página de login
        return <Navigate to="/login"/>
    }
    return(
        <>
        <header>
            <Menu/>
        </header>
        <main>
            <Outlet/>
        </main>
        </>
    );
}