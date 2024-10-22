const Cadastro = () => {
    return <>
        <div className="container sample-text-area">
            <h3 className="text-heading">Cadastrar ONG</h3>
            <hr />
            <div className="row">
                <div className="col-lg-8 col-md-8">
                    <h4 className="mb-30">Dados do Responsável</h4>
                    <form action="#">
                        <div className="mt-10">
                            <input type="text" name="first_name" placeholder="Nome" required
                                className="form-control" />
                        </div>
                        <div className="mt-10">
                            <input type="text" name="last_name" placeholder="Sobrenome" required
                                className="form-control" />
                        </div>
                        <div className="mt-10">
                            <input type="email" name="email" placeholder="Email" required
                                className="form-control" />
                        </div>
                        <div className="mt-10">
                            <input type="text" name="endereco" placeholder="Endereço" required className="form-control" />
                        </div>
                        <div className="mt-10">
                            <select className="form-control">
                                <option value="">Cidade</option>
                                <option value="1">Cachoeiro</option>
                                <option value="2">Marataízes</option>
                                <option value="3">Castelo</option>
                                <option value="4">Muqui</option>
                            </select>
                        </div>
                        <div className="mt-10">
                            <select className="form-control">
                                <option value="">Estado</option>
                                <option value="1">ES</option>
                                <option value="2">SP</option>
                                <option value="3">MG</option>
                                <option value="4">GO</option>
                            </select>
                        </div>

                        <h4 className="mt-5">Dados da Instituição</h4>

                        <div className="mt-10">
                            <input type="text" name="first_name" placeholder="Nome" required
                                className="form-control" />
                        </div>
                        <div className="mt-10">
                            <select name="" className="form-control">
                                <option value="">Principal Causa</option>
                                <option value="1">Meio Ambiente</option>
                                <option value="2">Saúde</option>
                                <option value="3">Trabalho</option>
                                <option value="4">Reforma Agrária</option>
                                <option value="5">Direito dos Animais</option>
                                <option value="5">Proteção de minorias</option>
                                <option value="5">Fome</option>
                                <option value="5">Pobreza</option>
                                <option value="5">Serviços Culturais</option>
                                <option value="5">Lazer</option>
                            </select>
                        </div>
                        <div className="mt-10">
                            <input type="email" name="email" placeholder="Email" required
                                className="form-control" />
                        </div>
                        <div className="mt-10">
                            <input type="text" name="endereco" placeholder="Endereço" required className="form-control" />
                        </div>
                        <div className="mt-10">
                            <select className="form-control">
                                <option value="">Cidade</option>
                                <option value="1">Cachoeiro</option>
                                <option value="2">Marataízes</option>
                                <option value="3">Castelo</option>
                                <option value="4">Muqui</option>
                            </select>
                        </div>
                        <div className="mt-10">
                            <select className="form-control">
                                <option value="">Estado</option>
                                <option value="1">ES</option>
                                <option value="2">SP</option>
                                <option value="3">MG</option>
                                <option value="4">GO</option>
                            </select>
                        </div>
                        <button type="submit" className="mt-5 btn btn-success">Cadastrar</button>
                    </form>
                </div >
            </div >
        </div >
    </>
}

export default Cadastro;