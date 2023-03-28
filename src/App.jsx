
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { auth } from "./firebase/config";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Root } from "./pages/Root/Root";

export function App(){

    const [usuarioLogado,setUsuarioLogado] = useState(null);

    useEffect(()=>{
        //monitorar/detectar o usuário conectado
        onAuthStateChanged(auth,(user)=>{
            //user é nulo = deslogado
            //user tem objeto = logado
        setUsuarioLogado(user);
        })
        //array vazio -> o efeito irá rodar apenas um vez
        //quando o app for renderizado
    },[])

    return(
        <>
            <AuthContext.Provider value={usuarioLogado}>
                <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root/>}>
                        <Route path="/" element={<Home/>}></Route>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/cadastro" element={<Cadastro/>}/>
                </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
            <Toaster/>
        </>
    )
}