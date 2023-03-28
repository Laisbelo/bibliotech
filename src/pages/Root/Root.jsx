
import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";

//Layout principal do App com Navbar fixa
//As páginas com Navbar fixa: home, livros, empréstimo e etc
export function Root(){
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