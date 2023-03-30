import { useEffect, useState } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { getEmprestimos } from "../../firebase/emprestimos";

export function Emprestimos (){

    const [emprestimos,setEmprestimos] = useState(null); //depois setar como null

    useEffect (() => {
        tabelaEmp();
    },[])

    function tabelaEmp(){
        getEmprestimos().then(busca=>{
            setEmprestimos(busca);
        })
    }

    return(
        <div className="emprestimos">
            <Container>
                <div className="d-flex justify-content-between align-itens-center mt-2">
                    <h1>Empréstimos</h1>
                    <Button as={Link} to="/emprestimos/adicionar" variant="success">Adicionar Empréstimo</Button>
                </div>
                    <hr/>
                    {
                        emprestimos === null?
                        <Loader/>
                        :
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Leitor</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Titulo Livro</th>
                                <th>Status</th>
                                <th>Data Empréstimo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        {emprestimos.map(emprestimo =>{
                            const dataEmprestimo = emprestimo.dataEmprestimo.toDate().toLocaleDateString('pt-br');
                            return(
                                <tbody>
                                    <tr key={emprestimo.id}>
                                        <td>{emprestimo.leitor}</td>
                                        <td>{emprestimo.email}</td>
                                        <td>{emprestimo.telefone}</td>
                                        <td>{emprestimo.livro.titulo}</td>
                                        <td>
                                            <Badge bg={emprestimo.status === "Pendente"? "warning":"success"}>{emprestimo.status}</Badge>
                                        </td>
                                        <td>{dataEmprestimo}</td>
                                        <td>
                                            <Button 
                                                as={Link}
                                                to={`/emprestimos/editar/${emprestimo.id}`}
                                                variant="warning" 
                                                size="sm"
                                                title="Editar">
                                                    <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </Table>
                    }
                   
            </Container>
        </div>
    )
}

{/*leitor email telefone titulolivro status data*/}