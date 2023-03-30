import { Button, Container, Form} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import { addLivro, uploadCapaLivro } from "../../firebase/livros";

export function AdicionarLivro(){

    const {register,handleSubmit,formState:{errors}} = useForm();
    const navigate = useNavigate();

    function onSubmit(data){
        const imagem = data.imagem[0]
        console.log(imagem)
        if(imagem) {
            const toastId = toast.loading("Upload da imagem...",{position: "top-right"});
            //upload
            uploadCapaLivro(imagem).then(url => {
                toast.dismiss(toastId);
                data.urlcapa = url;
                delete data.imagem;
                addLivro(data).then(()=>{
                    toast.success("Livro adicionado com sucesso",{duration:2000, position:"bottom-right"})
                    navigate("/livros")
                })
            })
        } else{
            delete data.imagem;
            addLivro(data).then(()=>{
            toast.success("Livro adicionado com sucesso",{duration:2000, position:"bottom-right"})
            navigate("/livros")
        })}
        
    }

    return(
        <div className="adicionar-livro">
            <Container>
                <h1>Adicionar Livro</h1>
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
                        <Form.Control type="file" accept=".png,.jpg,.jpeg,.gif"{...register("imagem")}/>
                    </Form.Group>
                    <Button type="submit" variant="success">Adicionar</Button>
                </Form>
            </Container>
        </div>
    )
}