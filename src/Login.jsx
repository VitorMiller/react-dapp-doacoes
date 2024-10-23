const Login = () => {
    return <>
        <div className="container sample-text-area mb-5 mt-5">
            <h3 className="text-heading mb-0 text-center">Login</h3>
                <div className="d-flex justify-content-center align-items-center text-center" >
                    <div className="col-lg-5 col-md-5 align-items-center">
                        <hr />
                        <form action="#">
                            <div className="mt-10">
                                <input type="text" name="login" placeholder="Login" required
                                    className="form-control" />
                            </div>
                            <div className="mt-10">
                                <input type="password" name="senha" placeholder="Senha" required
                                    className="form-control" />
                            </div>
                            
                        </form>
                        <p className="text-center mt-2 mb-3">Não possui conta? <a href="/cadastro">Cadastre-se!</a></p>
                        <a href="/perfilOng"><button className="mt-2 genric-btn info radius">Entrar</button></a>
                    </div >
                </div>
            
        </div >
    </>
}

export default Login;