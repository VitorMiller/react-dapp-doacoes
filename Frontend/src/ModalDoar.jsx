import React, { useState } from 'react';
import TableDoacoes from './TableDoacoes';
import TableRetiradas from './TableRetiradas';
import { ethers } from 'ethers';
import axios from 'axios'; 
import api from './axiosApi';

const ModalDoar = ({ ongId, doacoes, retiradas }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [donationAmount, setDonationAmount] = useState(''); // Estado para o valor da doação

  const ONG_WALLET_ADDRESS = '0x1feF888b16e87FBcc2F676FE562259ec9266703F'; // Endereço da carteira da ONG

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
        to: ONG_WALLET_ADDRESS,
        value,
      });

      await transaction.wait(); // Aguardar a confirmação da transação
      alert('Doação realizada com sucesso!');
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
        id_ong: ongId, // ID da ONG
      };

     
      await saveDonationData(donationData);
    } catch (error) {
      setErrorMessage('Erro ao realizar a doação: ' + error.message);
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

  return (
    <div className="modal fade" id="modalDoar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
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
                    <h5 className="card-title">World Wildlife Fund</h5>
                    <a href="https://worldwildlife.org" className="card-subtitle text-muted">
                      worldwildlife.org
                    </a>
                    <p className="card-text mt-3">
                      Conserve nature and reduce the most pressing threats to the diversity of life on Earth.
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
              <h4>Balanço da ONG: R$5.000,00</h4>
            </div>
            <hr />
            {doacoes.length > 0 ? (
              <TableDoacoes doacoes={doacoes} />
            ) : (
              <p>Nenhuma doação realizada ainda.</p>
            )}
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
