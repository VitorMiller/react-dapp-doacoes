import React, { useEffect, useState } from 'react'
import TableDoacoes from './TableDoacoes'
import TableRetiradas from './TableRetiradas';

const ModalDoar = ({ ongId, doacoes, retiradas }) => {
    const [loading, setLoading] = useState(true);


    return (
        <div className="modal fade" id="modalDoar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title fs-5">Apoie a instituição</h2>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mb-3 h-100">
                                    <img
                                        src="/img/causes/1.png"
                                        className="card-img-top"
                                        style={{"height": "200px", "object-fit": "cover"}}
                                        alt="Charity Image"                                        
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">World Wildlife Fund</h5>
                                        <a href="https://worldwildlife.org" className="card-subtitle text-muted">
                                            worldwildlife.org
                                        </a>
                                        <p className="card-text mt-3">
                                            Conserve nature and reduce the most pressing threats to the diversity of life on Earth.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Coluna 2 - Seleção de Moeda e Valor */}
                            <div className="col-md-6">
                                <form>
                                    <div className='form-group mt-3'>
                                        <label htmlFor="nome">Nome Completo</label>
                                        <input type="text" name="nome" id="nome" className='form-control' />
                                    </div>
                                    <div className='form-group mt-3'>
                                        <label htmlFor="nascimento">Data de Nascimento</label>
                                        <input type="date" name="nascimento" id="nascimento" className='form-control' />
                                    </div>
                                    <div className='form-group mt-3'>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" className='form-control' />
                                    </div>
                                    <div className='form-group mt-3'>
                                        <label htmlFor="telefone">Telefone</label>
                                        <input type="text" name="telefone" id="telefone" className='form-control' />
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
                        {doacoes.length > 0 ? 
                            <TableDoacoes doacoes={doacoes} /> : 
                            (<p>Nenhuma doação realizada ainda.</p>)}
                            
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

export default ModalDoar