import  { useState } from "react";
import api from "./axiosApi"; // Importando o arquivo de configuração do Axios

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("post_cadastro_ong", formData);
      console.log("Cadastro realizado com sucesso:", response.data);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error.response?.data || error.message);
      alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
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
                <input
                  type="text"
                  name="estado_responsavel"
                  placeholder="Estado"
                  required
                  className="form-control"
                  value={formData.estado_responsavel}
                  onChange={handleChange}
                />
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
                <input
                  type="text"
                  name="estado_ong"
                  placeholder="Estado da ONG"
                  required
                  className="form-control"
                  value={formData.estado_ong}
                  onChange={handleChange}
                />
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
