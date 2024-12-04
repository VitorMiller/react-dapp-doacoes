import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import TableDoacoes from './TableDoacoes';
import TableRetiradas from './TableRetiradas';
import { ethers } from 'ethers';
import api from './axiosApi';

const ModalDoar = ({ show, ong, doacoes, retiradas, handleClose }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [donationAmount, setDonationAmount] = useState(''); // Estado para o valor da doação
  const [donations, setDonations] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
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
        id_ong: ongId, // ID da ONG
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

  const fetchTransactions = async () => {
    const apiKey = "F8KVKAD3VJ3XCDYRAXWT77CQTE63EIATU5";
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${ong.carteira}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.status === "1") {
        return response.data.result; // Retorna a lista de transações
      } else {
        console.error("Erro ao buscar transações:", response.data.message);
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      return [];
    }
  };

  const processTransactions = (transactions) => {
    const donations = [];
    const withdrawals = [];
    let balance = 0;

    transactions.forEach((tx) => {
      const value = parseFloat(ethers.formatEther(tx.value));
      if (tx.to.toLowerCase() === walletAddress.toLowerCase()) {
        donations.push({ hash: tx.hash, value, timestamp: tx.timeStamp });
        balance += value;
      } else if (tx.from.toLowerCase() === walletAddress.toLowerCase()) {
        withdrawals.push({ hash: tx.hash, value, timestamp: tx.timeStamp });
        balance -= value;
      }
    });

    return {
      donations: donations.slice(0, 5), // Últimas 5 doações
      withdrawals: withdrawals.slice(0, 5), // Últimas 5 retiradas
      balance,
    };
  };

  const loadWalletData = async () => {
    try {
      const transactions = await fetchTransactions();
      const { donations, withdrawals, balance } = processTransactions(transactions);
      setDonations(donations);
      setWithdrawals(withdrawals);
      setBalance(balance);
    } catch (error) {
      console.error("Erro ao carregar dados da carteira:", error);
    }
  };


  const loadOng = async () => {
    try {
      const response = await api.get(`/get_ongs/${ongId}`);
      setOng(response.data);
    } catch (error) {
      console.error('Erro ao carregar a ONG:', error);
    }
  }

  useEffect(() => {
    loadWalletData();
    console.log(ong);
  }, [ong]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Apoie a instituição</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default ModalDoar;
