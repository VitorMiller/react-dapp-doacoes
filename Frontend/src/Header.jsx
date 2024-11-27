import { Link } from 'react-scroll';

const Header = () => {
    return (
        <div>
            <div className="header-area ">
                <div className="header-top_area">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-6 col-md-12 col-lg-8">
                                <div className="short_contact_list">
                                    <ul >
                                        {/* <li className="d-flex align-items-center">
                                  <a href="#">
                                      <i className="bi bi-envelope me-2"></i>
                                      donatechain@gmail.com
                                  </a>
                              </li> */}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-6 col-md-6 col-lg-4">
                                <div className="social_media_links d-none d-lg-block">
                                    <a href="#">
                                        <i className="bi bi-facebook"></i>
                                    </a>

                                    <a href="#">
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-envelope-at"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sticky-header" className="main-header-area">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-xl-3 col-lg-3">
                                <div className="logo">
                                    <a href="/">
                                        <div className="d-flex align-items-center" >

                                            <img src="img/logo.png" style={{ width: '80px', height: '70px' }} alt="" />
                                            <h2 className="pt-3 pl-3 text-white">DonateChain</h2>
                                        </div>

                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-9">
                                <div className="main-menu">
                                    <nav>
                                        <ul id="navigation">
                                            <li><a href="/">home</a></li>
                                            <li><a href="/login">Área ONG</a></li>
                                            {/* <li><a href="#">blog <i className="ti-angle-down"></i></a>
                                            <ul className="submenu">
                                                <li><a href="blog.html">blog</a></li>
                                                <li><a href="single-blog.html">single-blog</a></li>
                                            </ul>
                                        </li> */}
                                            {/* <li><a href="#">pages <i className="ti-angle-down"></i></a>
                                            <ul className="submenu">
                                                <li><a href="elements.html">elements</a></li>
                                                <li><a href="Cause.html">Cause</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="contact.html">Contact</a></li> */}
                                        </ul>
                                    </nav>
                                    <div className="Appointment">
                                        <div className="book_btn d-none d-lg-block">
                                            <Link to='ongs' smooth={true} duration={500}><a data-scroll-nav='1' href="#ongs">Quero Contribuir</a></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mobile_menu d-block d-lg-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Header