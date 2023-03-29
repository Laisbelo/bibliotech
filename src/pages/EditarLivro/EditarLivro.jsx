import { useEffect } from "react";
import { Button, Container, Form} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {useNavigate, useParams } from "react-router";
import { getLivro, updateLivro } from "../../firebase/livros";

export function EditarLivro(){
    const {id} = useParams();
    

    const {register,handleSubmit,formState:{errors},reset} = useForm();
    const navigate = useNavigate();

    function onSubmit(data){
        updateLivro(id, data).then(()=>{
            toast.success("Livro editado com sucesso",{duration:2000, position:"bottom-right"})
            navigate("/livros")
        })
    }

    useEffect(()=>{
        getLivro(id).then(livro =>{
            reset (livro);
        })
    },[id,reset])

    return(
        <div className="adicionar-livro">
            <Container>
                <h1>Editar Livro</h1>
                <hr/>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control  className={errors.titulo && "is-invalid"} type="text"{...register("titulo",{required:"O título é obrigatório!", maxLength:{value:255, message:"Limite de 255 caractéres"}})}/>
                        <Form.Text className="text-danger">
                            {errors.titulo?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control  className={errors.autor && "is-invalid"} type="text"{...register("autor",{required:"O autor é obrigatório!", maxLength:{value:255,message:"Limite de 255 caractéres"}})}/>
                        <Form.Text className="text-danger">
                            {errors.autor?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control className={errors.categoria && "is-invalid"} type="text"{...register("categoria",{required:"A categoria é obrigatória!", maxLength:{value:255,message:"Limite de 255 caractéres"}})}/>
                        <Form.Text className="text-danger">
                            {errors.categoria?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control  className={errors.isbn && "is-invalid"} type="text"{...register("isbn",{required:"O ISBN é obrigatório!", maxLength:{value:255,message:"Limite de 255 caractéres"}})}/>
                        <Form.Text className="text-danger">
                            {errors.isbn?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Capa do Livro</Form.Label>
                        <Form.Control  className={errors.urlcapa && "is-invalid"} type="url"{...register("urlcapa",{required:"O endereço da capa é obrigatório!"})}/>
                        <Form.Text className="text-danger">
                            {errors.urlcapa?.message}
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit" variant="success">Editar</Button>
                </Form>
            </Container>
        </div>
    )
}