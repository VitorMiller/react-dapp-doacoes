import { useEffect, useState } from "react";
import ModalRetirar from "./ModalRetirar";

const PerfilOng = () => {
    const [SelectedOngId, setSelectedOngId] = useState(0);
    const [doacoes, setDoacoes] = useState([]);
    const [retiradas, setRetiradas] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadDoacoes = (ongId) => {
        setLoading(true);
        // todo: fetch doacoes from blockchain

        // Mock data
        const doacoes = [
            { data: '2021-09-01', carteira: '0x1234567890', valor: 1 },
            { data: '2021-09-02', carteira: '0x1234567890', valor: 2 },
            { data: '2021-09-03', carteira: '0x1234567890', valor: 3 },
            { data: '2021-09-04', carteira: '0x1234567890', valor: 4 },
            { data: '2021-09-05', carteira: '0x1234567890', valor: 5 },
            { data: '2021-09-06', carteira: '0x1234567890', valor: 6 },
            { data: '2021-09-08', carteira: '0x1234567890', valor: 8 },
        ];
        setDoacoes(doacoes);
        setLoading(false);
    }

    const loadRetiradas = (ongId) => {
        setLoading(true);

        // todo: fetch retiradas from blockchain

        // Mock data
        const retiradas = [
            { data: '2021-09-01', finalidade: 'Compra ', valor: 1 },
            { data: '2021-09-02', finalidade: 'Compra de roupas', valor: 2 },
            { data: '2021-09-03', finalidade: 'Compra de brinquedos', valor: 3 },
            { data: '2021-09-04', finalidade: 'Compra de livros', valor: 4 },
            { data: '2021-09-05', finalidade: 'Compra de material escolar', valor: 5 },
            { data: '2021-09-06', finalidade: 'Custeio de alimentação', valor: 6 },
            { data: '2021-09-08', finalidade: 'Custeio de transporte', valor: 8 },
        ];
        setRetiradas(retiradas);
        setLoading(false);
    }

    const handleRetirar = (ongId) => {
        setSelectedOngId(ongId);
        loadDoacoes(ongId);
        loadRetiradas(ongId);
        const modal = new bootstrap.Modal(document.getElementById('modalRetirar'));
        modal.show();
    }

    useEffect(() => {
        loadDoacoes(SelectedOngId);
        loadRetiradas(SelectedOngId);
    }, []);

    return (
   
	<div className="container mt-5">

        
      <div className="section-top-border">
    <h3 className="mb-30 mt-5 text-center">Balanço Financeiro</h3>

    {/* Contêiner da Tabela Centralizada */}
    <div className="d-flex justify-content-center">
    <table style={{ width: '70%', textAlign: 'center'}}>
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
                        <div className="country">Carteira Doadora</div>
                        <div className="visit">Valor</div>
                        <div className="percentage">Data</div>
                    </div>
                    {doacoes.map((doacao, index) => (
                        <div className="table-row">
                            <div className="serial">{index + 1}</div>
                            <div className="country">{doacao.carteira}</div>
                            <div className="visit">{doacao.valor}</div>
                            <div className="visit">{doacao.data}</div>
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
                            <div className="country">{retirada.valor}</div>
                            <div className="visit">{retirada.data}</div>
                            <div className="visit">{retirada.finalidade}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-end align-items-end mb-5">
            <ModalRetirar ongId={SelectedOngId} doacoes={doacoes} retiradas={retiradas}/>
            <button className=" genric-btn danger radius" onClick={() => handleRetirar(1)}>Adicionar Retirada</button>
        </div>
    </div>
	
    )
}

export default PerfilOng;