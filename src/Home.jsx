
import './Home.css'

function Home() {

  return (
    <>
     {/* <div className="bradcam_area breadcam_bg overlay d-flex align-items-center justify-content-center">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="bradcam_text text-center">
                        <h3>CharityChain</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
     */}

<div className="slider_area">
<div className="single_slider  d-flex align-items-center slider_bg_1 overlay2">
    <div className="container">
        <div className="row">
            <div className="col-lg-9">
                <div className="slider_text">
                    <span>CONTRIBUA AGORA MESMO.</span>
                    <h3> Ajude as ONG&apos;s Cadastradas</h3>
                    <p>Com a transparência e segurança da blockchain, nosso site permite você visualize o <br/>destino e uso da sua doação.</p>
                    <a href="About.html" className="boxed-btn3">Saiba Mais
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
                <div className="col-lg-4 col-md-6">
                    <div className="single_reson">
                        <div className="thum">
                            <div className="thum_1">
                                <img src="img/help/1.png" alt=""/>
                            </div>
                        </div>
                        <div className="help_content">
                            <h4>ONG A</h4>
                            <p>Lorem ipsum, or lipsum as it is 
                                sometimes known, is dummy 
                                text used in laying out print.</p>
                            <a href="#" className="read_more">Fazer Doação</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="single_reson">
                        <div className="thum">
                            <div className="thum_1">
                                <img src="img/help/2.png" alt=""/>
                            </div>
                        </div>
                        <div className="help_content">
                            <h4>ONG B</h4>
                            <p>Lorem ipsum, or lipsum as it is 
                                sometimes known, is dummy 
                                text used in laying out print.</p>
                            <a href="#" className="read_more">Fazer Doação</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="single_reson">
                        <div className="thum">
                            <div className="thum_1">
                                <img src="img/help/3.png" alt=""/>
                            </div>
                        </div>
                        <div className="help_content">
                            <h4>ONG C</h4>
                            <p>Lorem ipsum, or lipsum as it is 
                                sometimes known, is dummy 
                                text used in laying out print.</p>
                            <a href="#" className="read_more">Fazer Doação</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    
    </div>
    </section>

    </>
  )
}

export default Home
