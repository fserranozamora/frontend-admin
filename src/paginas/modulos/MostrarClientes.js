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
                                            {/* 🌟 minWidth en 240px le da el espacio físico perfecto para que respiren con la separación amplia */}
                                            <th style={{ width: '22%', minWidth: '240px' }} className="text-center">Acciones</th>
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
                                                      - flex-row: Siempre horizontales en cualquier pantalla.
                                                      - gap-4: Crea una separación muy marcada en medio de ambos botones.
                                                      - px-3: Colchón interno de seguridad para alejarlos de los bordes laterales de la celda.
                                                    */}
                                                    <div className="d-flex flex-row justify-content-center align-items-center gap-4 px-3">
                                                        
                                                        {/* Botón Editar */}
                                                        <Link 
                                                            to={`/clientes/editar/${cliente._id}`} 
                                                            className="btn btn-sm btn-primary w-100 d-flex align-items-center justify-content-center py-1"
                                                            style={{ minWidth: '95px' }}
                                                        >
                                                            <i className="fa fa-pen mr-2"></i> Editar
                                                        </Link>
                                                        <p className="d-flex flex-column flex-sm-row justify-content-center gap- gap-sm-0 px-2 px-sm-2"></p>
                                                        {/* Botón Eliminar */}
                                                        <button 
                                                            onClick={(e) => eliminarClientes(e, cliente._id)} 
                                                            className="btn btn-sm btn-danger w-100 d-flex align-items-center justify-content-center py-1"
                                                            style={{ minWidth: '100px' }}
                                                        >
                                                            <i className="fa fa-trash mr-2"></i> Eliminar
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
