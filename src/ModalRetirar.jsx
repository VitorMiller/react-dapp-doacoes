import React, { useEffect, useState } from 'react'
import TableDoacoes from './TableDoacoes'
import TableRetiradas from './TableRetiradas';

const ModalRetirar = ({ ongId, doacoes, retiradas }) => {
    const [loading, setLoading] = useState(true);


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
                                <form>
                                    <div className='form-group mt-3'>
                                        <label htmlFor="finalidade">Finalidade</label>
                                        <input type="text" name="finalidade" id="finalidade" className='form-control' />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor='valor'>Valor</label>
                                        <input className='form-control' type="number" name="valor" id="valor" placeholder="0.0" />
                                    </div>

                                    <button variant="warning" className="mt-4 w-100">
                                        Conectar Carteira
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