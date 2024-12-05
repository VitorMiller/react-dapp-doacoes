import React, { useEffect, useState } from 'react';
import TableDoacoes from './TableDoacoes';
import TableRetiradas from './TableRetiradas';
import { ethers } from 'ethers';
import axios from 'axios';
import api from './axiosApi';
import { toast, ToastContainer } from 'react-toastify';

const ModalDoar = ({ ong }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [donationAmount, setDonationAmount] = useState(''); // Estado para o valor da doação
  const [doacoes, setDoacoes] = useState([]);
  const [retiradas, setRetiradas] = useState([]);
  const [balance, setBalance] = useState(0);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setErrorMessage('MetaMask não está instalada.');
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Erro ao conectar a MetaMask.');
    }
  };

  const sendDonation = async () => {
    if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) {
      setErrorMessage('Por favor, insira um valor válido para a doação.');
      return;
    }

    try {
      if (!window.ethereum) {
        setErrorMessage('MetaMask não está disponível.');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("Endereço do usuário conectado: ", userAddress);

      const value = ethers.parseUnits(donationAmount, 'ether');

      const transaction = await signer.sendTransaction({
        to: ong.carteira,
        value,
      });

      await transaction.wait(); // Aguardar a confirmação da transação
      toast.success('Doação realizada com sucesso!');
      setDonationAmount(''); // Limpar o campo de valor após a doação


      const nome = document.getElementById('nome').value;
      const nascimento = document.getElementById('nascimento').value; // No formato 'YYYY-MM-DD'
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;


      const donationData = {
        nome_doador: nome,
        nascimento_doador: nascimento, // No formato de data 'YYYY-MM-DD'
        email_doador: email,
        telefone_doador: telefone,
        carteira_doador: userAddress,
        valor: parseFloat(donationAmount), // Convertido para float
        hash_transacao: transaction.hash,
        id_ong: ong.id, // ID da ONG
      };


      await saveDonationData(donationData);
    } catch (error) {
      setErrorMessage('Erro ao realizar a doação: ' + error.message);
      toast.error('Erro ao realizar a doação: ' + error.message);
      console.error(error);
    }
  };

  const saveDonationData = async (donationData) => {
    try {
      const response = await api.post('/post_cadastro_doacao', donationData);
      console.log('Dados da doação salvos com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao salvar os dados na API:', error);
      setErrorMessage('Erro ao salvar os dados no banco: ' + error.message);
    }
  };

  const getWalletBalance = async () => {
    const apiKey = "F8KVKAD3VJ3XCDYRAXWT77CQTE63EIATU5";
    const url = `https://api-sepolia.etherscan.io/api?module=account&action=balance&address=${ong.carteira}&tag=latest&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.status === "1") {
        setBalance(ethers.formatEther(response.data.result));
      } else {
        console.error("Erro ao buscar saldo da carteira:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao buscar saldo da carteira:", error);
    }
  };

  const loadDoacoes = async () => {
    try {
      const response = await api.get('/get_doacoes/' + ong.id);
      setDoacoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar as doações:', error);
    }
  }

  const loadRetiradas = async () => {
    try {
      const response = await api.get('/get_retiradas/' + ong.id);
      setRetiradas(response.data);
    } catch (error) {
      console.error('Erro ao buscar as retiradas:', error);
    }
  }

  useEffect(() => {
    if (!ong) return;
    loadDoacoes();
    loadRetiradas();
    getWalletBalance();
  }, [ong]);

  return (
    <div className="modal fade" id="modalDoar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <ToastContainer />
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-5">Apoie a instituição</h2>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {/* Coluna 1: Informações da ONG */}
              <div className="col-md-6">
                <div className="card mb-3 h-100">
                  <img
                    src="/img/causes/1.png"
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                    alt="Charity Image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{ong?.nome}</h5>
                    {/* Nome, Email, Causa, Cidade, Estado */}
                    <p className="card-text">
                      <strong>Email:</strong> {ong?.email}
                    </p>
                    <p className="card-text">
                      <strong>Cidade:</strong> {ong?.cidade}
                    </p>
                    <p className="card-text">
                      <strong>Estado:</strong> {ong?.estado}
                    </p>
                    <p className="card-text mt-3">
                      <strong>Causa:</strong> {ong?.causa}
                    </p>
                  </div>
                </div>
              </div>

              {/* Coluna 2: Formulário de doação */}
              <div className="col-md-6">
                <form>
                  <div className="form-group mt-3">
                    <label htmlFor="nome">Nome Completo</label>
                    <input type="text" name="nome" id="nome" className="form-control" />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="nascimento">Data de Nascimento</label>
                    <input type="date" name="nascimento" id="nascimento" className="form-control" />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="form-control" />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="telefone">Telefone</label>
                    <input type="text" name="telefone" id="telefone" className="form-control" />
                  </div>

                  {/* Campo para inserção do valor da doação */}
                  <div className="form-group mt-3">
                    <label htmlFor="valor">Valor da Doação (ETH)</label>
                    <input
                      className="form-control"
                      type="number"
                      name="valor"
                      id="valor"
                      placeholder="0.0"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                    />
                  </div>

                  {!walletAddress ? (
                    <button
                      type="button"
                      className="btn btn-warning mt-4 w-100"
                      onClick={connectWallet}
                    >
                      Conectar Carteira
                    </button>
                  ) : (
                    <div className="mt-3">
                      <p>
                        <strong>Carteira Conectada:</strong> {walletAddress}
                      </p>
                      <button
                        type="button"
                        className="btn btn-success mt-4 w-100"
                        onClick={sendDonation}
                      >
                        Fazer Doação
                      </button>
                    </div>
                  )}

                  {errorMessage && (
                    <p className="text-danger mt-3">
                      <strong>Erro:</strong> {errorMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* Tabelas de doações e retiradas */}
            <div className="mt-5 mb-10">
              <h4>Saldo atual da ONG: {balance} Ethers</h4>
            </div>
            <hr />
            <h4>Últimas doações</h4>
            {doacoes.length > 0 ? (
              <TableDoacoes doacoes={doacoes} />
            ) : (
              <p>Nenhuma doação realizada ainda.</p>
            )}
            <h4>Últimas Retiradas</h4>
            {retiradas.length > 0 ? (
              <TableRetiradas retiradas={retiradas} />
            ) : (
              <p>Nenhuma movimentação realizada ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDoar;
