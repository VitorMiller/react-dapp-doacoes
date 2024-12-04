
import { useEffect, useState } from 'react'
import './Home.css'
import ModalDoar from './ModalDoar';
import api from "./axiosApi";


function Home() {
    const [SelectOng, setSelectedOng] = useState(0);
    const [doacoes, setDoacoes] = useState([]);
    const [retiradas, setRetiradas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ongs, setOngs] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const loadOngs = () => {
        setLoading(true);
        try {
            api.get('get_ongs').then((response) => {
                setOngs(response.data);
                setLoading(false);
            });
        }
        catch (error) {
            console.error("Erro ao carregar ONGs:", error);
        }
    }

    const loadDoacoes = (ongId) => {
        setLoading(true);
        // todo: fetch doacoes from blockchain

        // Mock data
        const doacoes = [
            { data: '2021-09-01', carteira: '0x1234567890', valor: 1 },
            { data: '2021-09-02', carteira: '0x1234567890', valor: 2 },
            { data: '2021-09-03', carteira: '0x1234567890', valor: 3 },
            { data: '2021-09-04', carteira: '0x1234567890', valor: 4 },
            { data: '2021-09-05', carteira: '0x1234567890', valor: 5 },
        ];
        setDoacoes(doacoes);
        setLoading(false);
    }

    const loadRetiradas = (ongId) => {
        setLoading(true);

        // todo: fetch retiradas from blockchain

        // Mock data
        const retiradas = [
            { data: '2021-09-01', finalidade: 'Compra de alimentos', valor: 1 },
            { data: '2021-09-02', finalidade: 'Compra de roupas', valor: 2 },
            { data: '2021-09-03', finalidade: 'Compra de brinquedos', valor: 3 },
            { data: '2021-09-04', finalidade: 'Compra de livros', valor: 4 },
            { data: '2021-09-05', finalidade: 'Compra de material escolar', valor: 5 },
        ];
        setRetiradas(retiradas);
        setLoading(false);
    }

    const handleDoar = (ong) => {
        setSelectedOng(ong);
        loadDoacoes(ong.id);
        loadRetiradas(ong.id);
        setShowModal(true);
    }

    useEffect(() => {
        loadOngs();
    }, []);


    return (
        <>
            {showModal && <ModalDoar show={showModal} ong={SelectOng} doacoes={doacoes} retiradas={retiradas} handleClose={() => setShowModal(false)}/>}
            <div className="slider_area">
                <div className="single_slider  d-flex align-items-center slider_bg_1 overlay2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="slider_text">
                                    <span>CONTRIBUA AGORA MESMO.</span>
                                    <h3> Ajude as ONG&apos;s Cadastradas</h3>
                                    <p>Com a transparência e segurança da blockchain, nosso site permite você visualize o <br />destino e uso da sua doação.</p>
                                    <a href="/saibaMais" className="boxed-btn3">Saiba Mais
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section id='ongs'>
                <div className="reson_area section_padding" >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="section_title text-center mb-55">
                                    <h3><span>ONG&apos;s e Instituições</span></h3>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {ongs.map((ong, index) => (
                                <div className="col-lg-4 col-md-6">
                                    <div className="single_reson">
                                        <div className="thum">
                                            <div className="thum_1">
                                                {/* Pick random picture from /img */}
                                                <img src={`img/help/${index % 3 + 1}.png`} alt="ONG" />
                                            </div>
                                        </div>
                                        <div className="help_content">
                                            <h4>{ong.nome}</h4>
                                            <p>Causa: {ong.causa}</p>
                                            <button className="" onClick={() => handleDoar(ong)}>Fazer Doação</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
