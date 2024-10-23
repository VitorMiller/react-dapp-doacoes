const PerfilOng = () => {
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
                    <div className="table-row">
                        <div className="serial">01</div>
                        <div className="country">0x1234567890</div>
                        <div className="visit">2</div>
                        <div className="visit">11/02/2024</div>
                       
                    </div>
                    <div className="table-row">
                        <div className="serial">02</div>
                        <div className="country">0x1234567890</div>
                        <div className="visit">2</div>
                        <div className="visit">11/02/2024</div>
                       
                    </div>
                    <div className="table-row">
                        <div className="serial">03</div>
                        <div className="country">0x1234567890</div>
                        <div className="visit">2</div>
                        <div className="visit">11/02/2024</div>
                       
                    </div>
                    <div className="table-row">
                        <div className="serial">04</div>
                        <div className="country">0x1234567890</div>
                        <div className="visit">2</div>
                        <div className="visit">11/02/2024</div>
                       
                    </div>
                    <div className="table-row">
                        <div className="serial">05</div>
                        <div className="country">0x1234567890</div>
                        <div className="visit">2</div>
                        <div className="visit">11/02/2024</div>
                       
                    </div>
                    <div className="table-row">
                        <div className="serial">06</div>
                        <div className="country">0x1234567890</div>
                        <div className="visit">2</div>
                        <div className="visit">11/02/2024</div>
                       
                    </div>
                    <div className="table-row">
                        <div className="serial">07</div>
                        <div className="country">0x1234567890</div>
                        <div className="visit">2</div>
                        <div className="visit">11/02/2024</div>
                       
                    </div>
                    <div className="table-row">
                        <div className="serial">08</div>
                        <div className="country">0x1234567890</div>
                        <div className="visit">2</div>
                        <div className="visit">11/02/2024</div>
                       
                    </div>
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
                    <div className="table-row">
                        <div className="serial">01</div>
                        <div className="country">2</div>
                        <div className="visit">11/02/2024</div>
                        <div className="visit">Custeio Alimentação</div>
                    </div>
                    <div className="table-row">
                        <div className="serial">02</div>
                        <div className="country">2</div>
                        <div className="visit">11/02/2024</div>
                        <div className="visit">Custeio Alimentação</div>
                    </div>
                    <div className="table-row">
                        <div className="serial">03</div>
                        <div className="country">2</div>
                        <div className="visit">11/02/2024</div>
                        <div className="visit">Custeio Alimentação</div>
                    </div>
                    <div className="table-row">
                        <div className="serial">04</div>
                        <div className="country">2</div>
                        <div className="visit">11/02/2024</div>
                        <div className="visit">Custeio Alimentação</div>
                    </div>
                    <div className="table-row">
                        <div className="serial">05</div>
                        <div className="country">2</div>
                        <div className="visit">11/02/2024</div>
                        <div className="visit">Custeio Alimentação</div>
                    </div>
                    <div className="table-row">
                        <div className="serial">06</div>
                        <div className="country">2</div>
                        <div className="visit">11/02/2024</div>
                        <div className="visit">Custeio Alimentação</div>
                    </div>
                    <div className="table-row">
                        <div className="serial">07</div>
                        <div className="country">2</div>
                        <div className="visit">11/02/2024</div>
                        <div className="visit">Custeio Alimentação</div>
                    </div>
                    <div className="table-row">
                        <div className="serial">08</div>
                        <div className="country">2</div>
                        <div className="visit">11/02/2024</div>
                        <div className="visit">Custeio Alimentação</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-end align-items-end mb-5">
            <a href="/perfilOng"><button className=" genric-btn danger radius">Adicionar Retirada</button></a>
        </div>
    </div>
	
    )
}

export default PerfilOng;