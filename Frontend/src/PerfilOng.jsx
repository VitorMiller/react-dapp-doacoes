import { useEffect, useState } from "react";
import ModalRetirar from "./ModalRetirar";
import api from "./axiosApi";

const PerfilOng = () => {
    const [doacoes, setDoacoes] = useState([]);
    const [retiradas, setRetiradas] = useState([]);
    const [loading, setLoading] = useState(true);

    const ondId = sessionStorage.getItem("ongId");

    const loadDoacoes = async () => {
        try {
            const response = await api.get('/get_doacoes/' + ondId);
            setDoacoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar as doações:', error);
        }
    }

    const loadRetiradas = async () => {
        try {
            const response = await api.get('/get_retiradas/' + ondId);
            setRetiradas(response.data);
        } catch (error) {
            console.error('Erro ao buscar as retiradas:', error);
        }
    }

    const handleRetirar = () => {
        const modal = new bootstrap.Modal(document.getElementById('modalRetirar'));
        modal.show();
    }



    useEffect(() => {
        loadDoacoes();
        loadRetiradas();
    }, []);

    return (

        <div className="container mt-5">


            <div className="section-top-border">
                <h3 className="mb-30 mt-5 text-center">Balanço Financeiro</h3>

                {/* Contêiner da Tabela Centralizada */}
                <div className="d-flex justify-content-center">
                    <table style={{ width: '70%', textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '33%' }}>Total Entradas</th>
                                <th style={{ width: '33%' }}>Total Retiradas</th>
                                <th style={{ width: '33%' }}>Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>150</td>
                                <td>10</td>
                                <td>140</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div className="section-top-border">
                <h3 className="mb-30 mt-5">Doações Recebidas</h3>
                <div className="progress-table-wrap">
                    <div className="progress-table">
                        <div className="table-head">
                            <div className="serial">#</div>
                            <div className="country">Hash da Transação</div>
                            <div className="visit">Valor</div>
                            <div className="percentage">Data</div>
                        </div>
                        {doacoes.map((doacao, index) => (
                            <div className="table-row">
                                <div className="serial">{index + 1}</div>
                                <div className="country" title={doacao.hash_transacao}>{doacao.hash_transacao.substring(0, 20)}...</div>
                                <div className="visit">{doacao.valor} Ethers</div>
                                <div className="visit">{doacao.data_hora_doacao}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            <div className="section-top-border">
                <h3 className="mb-30">Retiradas</h3>
                <div className="progress-table-wrap">
                    <div className="progress-table">
                        <div className="table-head">
                            <div className="serial">#</div>
                            <div className="country">Valor</div>
                            <div className="visit">Data</div>
                            <div className="percentage">Finalidade</div>
                        </div>
                        {retiradas.map((retirada, index) => (
                            <div className="table-row">
                                <div className="serial">{index + 1}</div>
                                <div className="country">{retirada.valor} Ethers</div>
                                <div className="visit">{retirada.data_hora_retirada}</div>
                                <div className="visit">{retirada.finalidade}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end align-items-end mb-5">
                <ModalRetirar ongId={ondId} doacoes={doacoes} retiradas={retiradas} />
                <button className=" genric-btn danger radius" onClick={() => handleRetirar()}>Adicionar Retirada</button>
            </div>
        </div>

    )
}

export default PerfilOng;