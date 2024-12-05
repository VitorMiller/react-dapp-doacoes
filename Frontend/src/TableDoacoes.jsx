import React from 'react';

const TableDoacoes = ({ doacoes }) => {
    return (
        <div>
            <table className='table table-sm table-striped'>
                <thead>
                    <tr>
                        <th>Data e Hora</th>
                        <th>Hash da Transação</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody style={{ "font-family": "Roboto" }}>
                    {doacoes.map((doacao, index) => (
                        <tr key={index}>
                            <td>{doacao.data_hora_doacao}</td>
                            <td title={doacao.hash_transacao}>{doacao.hash_transacao.substring(0, 30)}...</td>
                            <td>{doacao.valor} Ethers</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableDoacoes;