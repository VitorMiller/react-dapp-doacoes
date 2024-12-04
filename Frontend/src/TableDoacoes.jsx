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
                <tbody style={{"font-family": "Roboto"}}>
                    {doacoes.map((doacao, index) => (
                        <tr key={index}>
                            <td>{doacao.datetime}</td>
                            <td title={doacao.hash}>{doacao.hash.substring(0, 30)}...</td>
                            <td>{doacao.value} Ethers</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableDoacoes;