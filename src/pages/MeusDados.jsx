import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Table } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/Header'

import '../styles/pages/MeusDados.css'

const MeusDados = ({ data }) => {
    const localStorageData = JSON.parse(localStorage.getItem('meusDados')) || data;
    const [tableData, setTableData] = useState(localStorageData);

    const handleExcluirRegistro = (id) => {
        const atualizaLocalStorage = tableData.filter((item) => item.id !== id);
        setTableData(atualizaLocalStorage);
        let tamanhoArray = atualizaLocalStorage.length;
        if (tamanhoArray === 0) {
            localStorage.setItem('id', 0);
        }
        localStorage.setItem('meusDados', JSON.stringify(atualizaLocalStorage));
    }

    return (
        <>
            <Header />
            <Container fluid className='container-dados'>
                <div className='card'>
                    <Row>
                        <h4 className='text-center mt-4'>Meus Dados</h4>
                    </Row>
                    <Row>
                        <div className='p-4'>
                            <Table bordered responsive striped>
                                <thead>
                                    <tr className='text-center'>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>CPF</th>
                                        <th>Telefone</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.length > 0 ? (

                                        tableData.map((item) => (
                                            <tr key={item.id} className='text-center'>
                                                <td className='text-center'>{item.id}</td>
                                                <td>{item.nome}</td>
                                                <td>{item.email}</td>
                                                <td>{item.cpf}</td>
                                                <td>{item.telefone}</td>
                                                <td className='text-center'>
                                                    <button className='btn btn-sm btn-danger' onClick={() => handleExcluirRegistro(item.id)}>
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className='text-center'>Nenhum Registro Encontrado</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                        </div>
                    </Row>
                    <Row className='mt-auto text-end'>
                        <Col xs={12} className='p-4'>
                            <a href='/cadastro' className='btn-cadastro'>
                                Novo Cadastro
                            </a>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default MeusDados;