import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";
import swal from "sweetalert";

export const MostrarClientes = () => {

    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {
        const response = await APIInvoke.invokeGET('/api/clientes');
        setClientes(response.clientes);
    };

    useEffect(() => {
        getClientes();
    }, []);

    const eliminarClientes = async (e, idCliente) => {
        e.preventDefault();
        
        try {
            const response = await APIInvoke.invokeDELETE(`/api/clientes/${idCliente}`);

            if (response && response.msg === 'El cliente fue eliminado') {
                const msg = "El cliente fue eliminado correctamente";
                swal({
                    title: 'Información',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                });
                getClientes();
            } else {
                const msg = response?.msg || "El cliente no fue eliminado correctamente";
                swal({
                    title: 'Error',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            }
        } catch (error) {
            console.error("Error en petición DELETE:", error);
            swal({
                title: 'Error de Red',
                text: "No se pudo conectar con el servidor.",
                icon: 'error',
                className: 'btn btn-danger'
            });
        }
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />

            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Listado de Clientes"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Clientes"}
                    ruta1={"/home"}
                />

                <section className="content px-2 px-sm-3">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={"/clientes/agregar"} className="btn btn-block btn-success btn-sm"> 
                                    Agregar Clientes <i className="fa fa-user-plus"> </i>
                                </Link>
                            </h3>
                        </div>

                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover align-middle">
                                    <thead className="table-success">
                                        <tr>
                                            <th style={{ width: '13%', minWidth: '130px' }}>Nombres</th>
                                            <th style={{ width: '13%', minWidth: '130px' }}>Apellidos</th>
                                            <th style={{ width: '10%', minWidth: '100px' }}>Cédula</th>
                                            <th style={{ width: '18%', minWidth: '180px' }}>Correo</th>
                                            <th style={{ width: '11%', minWidth: '110px' }}>Teléfono</th>
                                            <th style={{ width: '13%', minWidth: '140px' }}>Dirección</th>
                                            {/* El minWidth de 180px reserva el espacio horizontal exacto para que entren ambos botones sin pegarse */}
                                            <th style={{ width: '22%', minWidth: '180px' }} className="text-center">Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody className="table-info">
                                        {clientes.map((cliente, index) => (
                                            <tr key={index}>
                                                <td>{cliente.nombres}</td>
                                                <td>{cliente.apellidos}</td>
                                                <td>{cliente.cedula}</td>
                                                <td>{cliente.correo}</td>
                                                <td>{cliente.telefono}</td>
                                                <td>{cliente.direccion}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                    
                                                    {/* 
                                                      Contenedor centrado. Eliminamos clases complejas de gap para asegurar 
                                                      compatibilidad absoluta con cualquier versión de Bootstrap.
                                                    */}
                                                    <div className="d-flex flex-row justify-content-center align-items-center p-1">
                                                        
                                                        {/* 
                                                          Botón Editar:
                                                          - flex-column flex-md-row: En celular pone icono arriba y texto abajo (cuadrado). En PC todo en línea.
                                                          - mr-2 mr-md-3: 🌟 CLAVE: Fuerza un margen derecho inamovible para separarlo del botón de eliminar.
                                                        */}
                                                        <Link 
                                                            to={`/clientes/editar/${cliente._id}`} 
                                                            className="btn btn-sm btn-primary d-flex flex-column flex-md-row align-items-center justify-content-center p-2 lh-sm mr-2 mr-md-3 text-decoration-none"
                                                            style={{ width: '65px', height: '65px', minWidth: '100px', minHeight: '0px' }}
                                                        >
                                                            <i className="fa fa-pen mb-1 mb-md-0 mr-0 mr-md-2"></i> 
                                                            <span style={{ fontSize: '1rem' }} className="d-block text-center font-weight-normal">Editar</span>
                                                        </Link>

                                                        {/* 
                                                          Botón Eliminar:
                                                          - Mantiene las mismas dimensiones exactas (65px) para formar el cuadrado perfecto.
                                                        */}
                                                        <button 
                                                            onClick={(e) => eliminarClientes(e, cliente._id)} 
                                                            className="btn btn-sm btn-danger d-flex flex-column flex-md-row align-items-center justify-content-center p-2 lh-sm"
                                                            style={{ width: '65px', height: '65px', minWidth: '100px', minHeight: '0px' }}
                                                        >
                                                            <i className="fa fa-trash mb-1 mb-md-0 mr-0 mr-md-2"></i> 
                                                            <span style={{ fontSize: '1rem' }} className="d-block text-center font-weight-normal">Eliminar</span>
                                                        </button>

                                                    </div>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> {/* Fin de table-responsive */}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default MostrarClientes;
