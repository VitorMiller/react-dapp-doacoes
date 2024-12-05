import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./authService";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        senha: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (await login(inputs.email, inputs.senha)) {
            navigate("/perfilOng");
        } else {
            setErrors({ email: 'E-mail ou senha inválidos' });
        }
        setLoading(false);
    }


    return <>
        <div className="container sample-text-area mb-5 mt-5">
            <h3 className="text-heading mb-0 text-center">Login</h3>
            <div className="d-flex justify-content-center align-items-center text-center" >
                <div className="col-lg-5 col-md-5 align-items-center">
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="mt-10">
                            <input type="email" name="email" placeholder="Email" required
                                className="form-control" value={inputs.email} onChange={handleInputChange} />
                        </div>
                        <div className="mt-10">
                            <input type="password" name="senha" placeholder="Senha" required
                                className="form-control" value={inputs.senha} onChange={handleInputChange} />
                        </div>
                        {errors.email && <p className="text-danger mt-3">{errors.email}</p>}

                        <p className="text-center mt-2 mb-3">Não possui conta? <a href="/cadastro">Cadastre-se!</a></p>
                        <button type="submit" className="mt-2 genric-btn info radius">Entrar</button>
                    </form>
                </div >
            </div>

        </div >
    </>
}

export default Login;