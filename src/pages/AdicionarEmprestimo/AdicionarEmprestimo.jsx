import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { adicionarEmprestimo } from "../../firebase/emprestimos";
import { getLivro, getLivros } from "../../firebase/livros";

export function AdicionarEmprestimo(){

    const [livros,setLivros] = useState([]);

    const {register,handleSubmit,formState:{errors}} =useForm();

    function onSubmit(data){
        getLivro(data.idLivro).then(livro =>{
            delete data.idLivro; // deleta o id do livro
            let novoEmprestimo ={...data,status:"Pendente",livro, dataEmprestimo: new Date()}
            adicionarEmprestimo(novoEmprestimo).then(()=>{
                toast.success("Empréstimo adicionado com sucesso!",{duration:2000,position:"bottom-right"})
            })
        })
        
    }

    useEffect(()=>{
        getLivros().then(busca => {
            setLivros(busca)
        })
    },[])


    return(
        <div className="adicionar-empretimo">
            <Container>
                <h1>Adicionar Empréstimo</h1>
                <hr/>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>Leitor</Form.Label>
                        <Form.Control type="text" className={errors.leitor && "is-invalid"}{...register("leitor",{required:"Leitor é obrigatório!", maxLength: {value:255, message:"Limite de 255 caractéres"}})}/>
                        <Form.Text className="invalid-feedback">
                            {errors.leitor?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" className={errors.email && "is-invalid"}{...register("email",{required:"Email é obrigatório!", maxLength: {value:255, message:"Limite de 255 caractéres"}})}/>
                        <Form.Text className="invalid-feedback">
                            {errors.email?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="tel" className={errors.telefone && "is-invalid"}{...register("telefone",{required:"Número de telefone é obrigatório!", maxLength: {value:15, message:"Limite de 15 caractéres"}})}/>
                        <Form.Text className="invalid-feedback">
                            {errors.telefone?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Livro</Form.Label>
                        <Form.Select className={errors.idLivro && "is-invalid"} {...register("idLivro",{required:"Livro é obrigatório"})}>
                            {livros.map((livro) => <option key={livro.id} value={livro.id}>{livro.titulo}</option>)}
                        </Form.Select>
                        <Form.Text className="invalid-feedback">
                            {errors.idLivro?.message}
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit" variant="success mt-2">Emprestar</Button>
                </Form>
            </Container>
        </div>
    );
}