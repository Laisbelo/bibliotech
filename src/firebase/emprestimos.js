import { addDoc } from "firebase/firestore";
import { emprestimosCollection } from "./collections";

export async function adicionarEmprestimo(data){
    await addDoc(emprestimosCollection,data)
}