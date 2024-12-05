import React, { useEffect, useState } from 'react'
import TableRetiradas from './TableRetiradas';
import api from './axiosApi';
import { useNavigate } from 'react-router-dom';

const ModalRetirar = ({ ongId, retiradas }) => {
    const [inputs, setInputs] = useState({
        finalidade: '',
        valor: ''
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/perfilOng/post_cadastro_retirada', inputs);
            navigate('/perfilOng');
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    return (
        <div className="modal fade" id="modalRetirar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title fs-5">Adicionar Retirada</h2>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {/* Coluna 2 - Seleção de Moeda e Valor */}
                            <div className="col">
                                <form onSubmit={handleSubmit} >
                                    <div className='form-group mt-3'>
                                        <label htmlFor="finalidade">Finalidade</label>
                                        <input type="text" name="finalidade" id="finalidade" className='form-control' value={inputs?.finalidade} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor='valor'>Valor</label>
                                        <input className='form-control' type="number" name="valor" id="valor" placeholder="0.0" value={inputs?.valor} onChange={handleChange} />
                                    </div>

                                    <button variant="warning" className="mt-4 w-100">
                                        Cadastrar Retirada
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className='mt-5 mb-10'>
                            <h4>Balanço: R$5.000,00</h4>
                        </div>
                        <hr />

                        {retiradas.length > 0 ?
                            <TableRetiradas retiradas={retiradas} /> :
                            (<p>Nenhuma movimentação realizada ainda.</p>)}
                    </div>

                </div>
                {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Sim</button>
                </div> */}
            </div>
        </div>
    )
}

export default ModalRetirar