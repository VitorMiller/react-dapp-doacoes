import React from 'react';

const TableRetiradas = ({ retiradas }) => {
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
                    {retiradas.map((retirada, index) => (
                        <tr key={index}>
                            <td>{retirada.datetime}</td>
                            <td title={retirada.hash}>{retirada.hash.substring(0, 30)}...</td>
                            <td>{retirada.value} Ethers</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableRetiradas;