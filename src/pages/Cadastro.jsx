import '../styles/pages/Cadastro.css'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { Container, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask'

const Cadastro = ({ onSubmit }) => {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: ''
    });
    const navigate = useNavigate();
    const [validForm, setValidForm] = useState(false)
    const [validEmail, setValidEmail] = useState(false);

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            onSubmit(form);
            setValidForm(false)
            navigate('/meusDados');
        } catch (error) {
            console.log(error.message)
        }
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setValidEmail(true)
        } else {

            setValidEmail(false)
        }
    };

    useEffect(() => {
        isValidEmail(form.email)
        const isValid = Object.values(form).every((value) => value.trim() !== '') && validEmail === true;
        setValidForm(isValid);
    }, [form])



    return (
        <Container fluid>
            <Row>
                <Col xl={8} xs={12} sm={6} md={6} lg={6} className='background-img d-none d-md-block'>
                </Col>
                <Col xl={4} xs={12} md={6} lg={6}>
                    <div className='form-card'>
                        <h3 className='header mb-5'>Lean Cadastro</h3>
                        <form onSubmit={handleSubmit} >
                            <div className="col-12 mb-2">
                                <input type='text' name='nome' onChange={handleChange} value={form.nome} placeholder='Nome Completo'></input>
                            </div>
                            <div className="col-12 mb-2">
                                <input type='text' name='email' onChange={handleChange} value={form.email} placeholder='E-Mail'></input>
                                {form.email && (
                                    <span className={validEmail ? 'valid-span' : 'invalid-span'}>
                                        {validEmail ? 'Email válido' : 'Email inválido'}
                                    </span>
                                )}
                            </div>
                            <div className="col-12 mb-2">
                                <InputMask mask='999.999.999-99' type='text' name='cpf' onChange={handleChange} value={form.cpf} placeholder='CPF'></InputMask>
                            </div>
                            <div className="col-12 mb-2">
                                <InputMask mask='(99) 99999-9999' type='text' name='telefone' onChange={handleChange} value={form.telefone} placeholder='Telefone'></InputMask>
                            </div>
                            <div className='row'>
                                <div className='col-12 mt-5 text-center'>
                                    <button className='btn-cadastro' type='submit' disabled={!validForm}>
                                        Cadastrar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Cadastro;

//Nome completo
// CPF
// Telefone
// Email