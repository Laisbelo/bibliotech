import { Button, Container, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png"
import googleIcon from "../../assets/icons/google-white.svg"
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha, loginGoogle } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Cadastro(){
    const {register,handleSubmit,formState:{errors}} = useForm();

    const navigate = useNavigate();

    function onSubmit(data){
        const {email,senha} = data;
        cadastrarEmailSenha(email,senha).then((user)=>{
                toast.success(`Bem-vindo(a) ${user.email}`,{
                position:"bottom-right",
                duration:"2500"
            }); 
            navigate("/");
        }).catch((erro)=>{
                toast.error(`Um erro aconteceu. Código ${erro.code}`,{
                position:"bottom-right", 
                duration:"2500"
            })
        });
    }
    //then -> quando der certo o processo
    function onLoginGoogle(){
        loginGoogle().then((user) => {
            toast.success(`Bem-vindo(a) ${user.email}`,{
                position:"bottom-right",
                duration:"2500"
            });
            navigate("/");
        }).catch((erro)=>{
            toast.error(`Um erro aconteceu. Código ${erro.code}`,{
            position:"bottom-right", 
            duration:"2500"
            })
        });
    }

    const usuarioLogado=useContext(AuthContext);
    if(usuarioLogado !== null){
        return <Navigate to="/"/>
    }

    return(
        <Container fluid class="my-5">
            <p className="text-center">
                <img alt="Logo do app" src={logoIcon}/>
            </p>
            <h4>Faça parte da nossa plataforma</h4>
            <p className="text-muted">
                Ja tem conta? 
                <Link to="/login">Faça Login</Link>
            </p>
            <hr/>
            <Button className="mb-3" variant="danger" onClick={onLoginGoogle}>
                <img alt="Logo do google" src={googleIcon} width="32"/>
                Login com o Google 
            </Button>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className={errors.email ?"is-invalid":""} type="email" placeholder="Seu email"
                    {...register("email",{required:"O email é obrigatório"})}/>
                    <Form.Text className="invalid-feedback">
                        {errors.email?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control className={errors.senha ?"is-invalid":""} type="password" placeholder="Sua senha"
                    {...register("senha",{required:"A senha é obrigatória"})}/>
                    <Form.Text className="invalid-feedback">
                        {errors.senha?.message}
                    </Form.Text>
                </Form.Group>
                <Button type="submit" variant="success">
                Cadastrar
                </Button>
            </Form>
        </Container>
    )
}