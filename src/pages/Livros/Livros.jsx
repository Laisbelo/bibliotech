import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css"

export function Livros() {

    const [livros,setLivros] = useState(null);
    useEffect(() => {
        //buscar informações do banco
        initializeTable();
    },[]);

    function initializeTable(){
        getLivros().then(busca =>{
            setLivros(busca)
        });
    }

    function onDeleteLivro(id,titulo){
        const deletar = window.confirm(`Tem certeza que deseja excluir o livro ${titulo}?`);
        if(deletar){
            //apagar o livro
            deleteLivro(id).then(()=>{
                toast.success(`${titulo} apagado com sucesso!`,{duration:2000, position:"bottom-right"});
                getLivros().then(busca =>{
                    setLivros(busca)
                });
            })
        }
    }

    return (
        <div className="livros">
        <Container>
            <div className="d-flex justify-content-between align-items-center">
            <h1>Livros</h1>

            <Button as={Link} to="/livros/adicionar" variant="success">
                Adicionar Livro
            </Button>
            </div>
            <hr />
            {livros===null ? 
            <Loader/> 
            : 
            (<Table striped bordered hover>
            <thead>
                <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>ISBN</th>
                <th>Imagem</th>
                <th>Açôes</th>
                </tr>
            </thead>
                {livros.map((livro)=>{
                    return(
                        <tbody>
                        <tr key={livro.id}>
                            <td>{livro.titulo}</td>
                            <td>{livro.autor}</td>
                            <td>{livro.categoria}</td>
                            <td>{livro.isbn}</td>
                            <td><img src={livro.urlcapa} alt={livro.titulo}/></td>
                            <td>
                                <Button 
                                as={Link} 
                                to={`/livros/editar/${livro.id}`}
                                variant="warning"
                                size="sm"
                                className="me-1"
                                title="Editar">
                                    <i className="bi bi-pencil-fill"></i>
                                </Button>
                                <Button 
                                variant="danger" 
                                size="sm"
                                title="Apagar"
                                onClick={() => onDeleteLivro(livro.id,livro.titulo)}>
                                    <i className="bi bi-trash3-fill" 
                                    ></i>
                                </Button>
                            </td>
                        </tr>
                        </tbody>
                    )
                })}
            </Table>
            )}
        </Container>
        </div>
    );
}
