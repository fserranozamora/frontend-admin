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
        const response = await APIInvoke.invokeDELETE(`/api/clientes/${idCliente}`);

        if (response.msg === 'El cliente fue eliminado') {
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
            const msg = "El cliente no fue eliminado correctamente";
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

                {/* Corrección de seccion a section */}
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={"/clientes/agregar"} className="btn btn-block btn-success btn-sm"> 
                                    Agregar Clientes <i className="fa fa-user-plus"> </i>
                                </Link>
                            </h3>
                        </div>

                        <div className="card-body">
                            {/* table-responsive añade scroll horizontal automático en celulares y tablets */}
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
                                            {/* Columna de acciones más ancha para permitir la separación extrema */}
                                            <th style={{ width: '22%', minWidth: '220px' }} className="text-center">Acciones</th>
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
                                                      Explicación de clases responsivas:
                                                      - d-flex flex-column: Por defecto (celulares) los botones van uno arriba del otro.
                                                      - flex-sm-row: A partir de pantallas SM (tablets/PC) se vuelven horizontales.
                                                      - gap-2 gap-sm-5: Separación pequeña en móvil, separación máxima (gap-5) en pantallas grandes.
                                                      - px-sm-4: Margen a los lados en pantallas grandes para no tocar los bordes de la celda.
                                                    */}
                                                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-5 px-0 px-sm-4">
                                                        <Link 
                                                            to={`/clientes/editar/${cliente._id}`} 
                                                            className='btn btn-sm btn-primary w-100'
                                                        >
                                                            <i className="fa fa-pen"></i> Editar
                                                        </Link>
                                                        <p className="d-flex flex-column flex-sm-row justify-content-center gap-0 gap-sm-1 px-0 px-sm-1"></p>
                                                        <button 
                                                            onClick={(e) => eliminarClientes(e, cliente._id)} 
                                                            className='btn btn-sm btn-danger w-100'
                                                        >
                                                            <i className="fa fa-trash"></i> Eliminar
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
