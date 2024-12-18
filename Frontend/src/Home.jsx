
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

    const handleDoar = (ong) => {
        setSelectedOng(ong);
        const modal = new bootstrap.Modal(document.getElementById('modalDoar'));
        modal.show();
        setShowModal(true);
    }

    useEffect(() => {
        loadOngs();
    }, []);


    return (
        <>
            <ModalDoar ong={SelectOng} />
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
