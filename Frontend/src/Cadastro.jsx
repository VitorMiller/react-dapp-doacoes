import { useState } from "react";
import api from "./axiosApi";
import { useNavigate } from "react-router-dom";
import parseErrors from "./parseErrors";
import { toast } from "react-toastify";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome_responsavel: "",
    sobrenome_responsavel: "",
    email_responsavel: "",
    endereco_responsavel: "",
    cidade_responsavel: "",
    estado_responsavel: "",
    nome_ong: "",
    causa_ong: "",
    email_ong: "",
    endereco_ong: "",
    cidade_ong: "",
    estado_ong: "",
    carteira_ong: "",
    senha: "",
    imagem: null,
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setFormData({ ...formData, imagem: file });
    }
    try {
      const response = await api.postForm("post_cadastro_ong", formData);
      console.log("Cadastro realizado com sucesso:", response.data);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      toast.error("Erro ao realizar cadastro!");
      if (error && error.response && error.response.data)
        setErrors(parseErrors(error.response.data));
    }
  };

  return (
    <>
      <div className="container sample-text-area">
        <h3 className="text-heading">Cadastrar ONG</h3>
        <hr />
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <h4 className="mb-30">Dados do Responsável</h4>
            <form onSubmit={handleSubmit}>
              <div className="mt-10">
                <input
                  type="text"
                  name="nome_responsavel"
                  placeholder="Nome"
                  required
                  className="form-control"
                  value={formData.nome_responsavel}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <input
                  type="text"
                  name="sobrenome_responsavel"
                  placeholder="Sobrenome"
                  required
                  className="form-control"
                  value={formData.sobrenome_responsavel}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <input
                  type="email"
                  name="email_responsavel"
                  placeholder="Email"
                  required
                  className="form-control"
                  value={formData.email_responsavel}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <input
                  type="text"
                  name="endereco_responsavel"
                  placeholder="Endereço"
                  required
                  className="form-control"
                  value={formData.endereco_responsavel}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <input
                  type="text"
                  name="cidade_responsavel"
                  placeholder="Cidade"
                  required
                  className="form-control"
                  value={formData.cidade_responsavel}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <select
                  name="estado_responsavel"
                  className="form-control"
                  value={formData.estado_responsavel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Estado</option>
                  <option value="ES">ES</option>
                  <option value="SP">SP</option>
                  <option value="MG">MG</option>
                  <option value="GO">GO</option>
                </select>
              </div>

              <h4 className="mt-5">Dados da Instituição</h4>

              <div className="mt-10">
                <input
                  type="text"
                  name="nome_ong"
                  placeholder="Nome da ONG"
                  required
                  className="form-control"
                  value={formData.nome_ong}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <input
                  type="text"
                  name="causa_ong"
                  placeholder="Causa"
                  required
                  className="form-control"
                  value={formData.causa_ong}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <input
                  type="email"
                  name="email_ong"
                  placeholder="Email da ONG"
                  required
                  className="form-control"
                  value={formData.email_ong}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <input
                  type="text"
                  name="endereco_ong"
                  placeholder="Endereço da ONG"
                  required
                  className="form-control"
                  value={formData.endereco_ong}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <input
                  type="text"
                  name="cidade_ong"
                  placeholder="Cidade da ONG"
                  required
                  className="form-control"
                  value={formData.cidade_ong}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <select
                  name="estado_ong"
                  className="form-control"
                  value={formData.estado_ong}
                  onChange={handleChange}
                  required
                >
                  <option value="">Estado da ONG</option>
                  <option value="ES">ES</option>
                  <option value="SP">SP</option>
                  <option value="MG">MG</option>
                  <option value="GO">GO</option>
                </select>
              </div>
              <div className="mt-10">
                <input
                  type="text"
                  name="carteira_ong"
                  placeholder="Carteira da ONG"
                  required
                  className="form-control"
                  value={formData.carteira_ong}
                  onChange={handleChange}
                />
              </div>
              <hr />
              <div className="mt-10">
                <input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  required
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-10">
                <input
                  type="password"
                  name="confirmacao_senha"
                  placeholder="Confirmação de Senha"
                  required
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="mt-10">
                  <label htmlFor="imagem" className='form-label'>Foto de Perfil da Ong</label>
                  <input type="file" id="imagem" name="imagem" className={`form-control ${errors?.imagem ? 'is-invalid' : ''}`} onChange={handleFileChange} accept='image/*' />
                  {errors?.imagem && <div
                    className='invalid-feedback'>{errors.imagem}</div>}
                </div>
              </div>
              <button type="submit" className="mt-5 btn btn-success">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cadastro;