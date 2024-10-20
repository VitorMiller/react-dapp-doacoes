import React from 'react';

const TableRetiradas = ({ retiradas }) => {
    return (
        <div>
            <h4>Últimas Retiradas</h4>
            <table className='table table-sm table-striped'>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Finalidade</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {retiradas.map((retirada, index) => (
                        <tr key={index}>
                            <td>{retirada.data}</td>
                            <td>{retirada.finalidade}</td>
                            <td>{retirada.valor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableRetiradas;