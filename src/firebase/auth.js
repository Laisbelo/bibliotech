
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,signOut} from "firebase/auth";
import {auth} from "./config";

//função assincrona = função que o resultado não é obtido de imediato
//Haverá "espera"
export async function cadastrarEmailSenha(email,senha){
    //indicar para o firebase que queremos cadastrar um novo usuário utilizando email/senha

    //(await) Aguardando o resulado do firebase
    const resultado = await createUserWithEmailAndPassword(auth,email,senha); //retorna os possíveis dados do usuário

    return resultado.user;//user é o objeto com todas as informações do usuário
}

export async function loginGoogle(){
    //configura como o login do google vai funcionar
    const provider = new GoogleAuthProvider();
    const resultado = await signInWithPopup(auth,provider);

    return resultado.user;
}

export async function loginEmailSenha (email,senha){
    //vai realizar o login com uma conta de email ja existente
    const resultado = await signInWithEmailAndPassword (auth, email, senha);

    return resultado.user;
}

export async function logout(){
    //Deslogar o usuário atual do firebase
    await signOut(auth);
}