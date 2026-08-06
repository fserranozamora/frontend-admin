import React from 'react'
import { Link } from 'react-router-dom'
import ContentHeader from './componentes/ContentHeader'
import Footer from './componentes/Footer';
import Navbar from './componentes/Navbar';
import SidebarContainer from './componentes/SidebarContainer';

const Home = () => {
    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Página principal"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Página principal"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="container-fluid">
                        
                        {/* UN SOLO ROW: Permite alinear las tarjetas horizontalmente */}
                        <div className="row">

                            {/* Tarjeta de Clientes */}
                            {/* col-12: vertical en móviles | col-md-6: horizontal en tablets | col-lg-3: computadoras */}
                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <div className="small-box bg-primary">
                                    <div className="inner">
                                        <h3>Clientes</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-edit" />
                                    </div>
                                    <Link to={"/clientes"} className="small-box-footer"> 
                                        Clientes <i className="fas fa-arrow-circle-right" />
                                    </Link>
                                </div>
                            </div>

                            {/* Tarjeta de Productos */}
                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <div className="small-box bg-secondary">
                                    <div className="inner">
                                        <h3> Productos </h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-edit" />
                                    </div>
                                    <Link to={"/productos"} className="small-box-footer"> 
                                        Productos <i className="fas fa-arrow-circle-right" />
                                    </Link>
                                </div>
                            </div>

                        </div> {/* Fin del row */}

                    </div>
                </section>

            </div>
            
            <Footer></Footer>
        </div>
    );
}

export default Home;
