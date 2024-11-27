import React from 'react';

const TableDoacoes = ({ doacoes }) => {
    return (
        <div>
            <h4>Últimas doações</h4>
            <table className='table table-sm table-striped'>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Carteira</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody style={{"font-family": "Roboto"}}>
                    {doacoes.map((doacao, index) => (
                        <tr key={index}>
                            <td>{doacao.data}</td>
                            <td>{doacao.carteira}</td>
                            <td>{doacao.valor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableDoacoes;