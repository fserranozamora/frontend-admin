import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";
import swal from "sweetalert";

export const MostrarProductos = () => {

    const [productos, setProductos] = useState([]);

    const getProductos = async () => {
        const response = await APIInvoke.invokeGET('/api/productos');
        setProductos(response.productos);
    };

    useEffect(() => {
        getProductos();
    }, []);

    const eliminarProductos = async (e, idProducto) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/productos/${idProducto}`);

        if (response && response.msg === 'El producto fue eliminado') {
            const msg = "El producto fue eliminado correctamente";
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
            getProductos();
        } else {
            const msg = "El producto no fue eliminado correctamente";
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
                    titulo={"Listado de Productos"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Productos"}
                    ruta1={"/home"}
                />

                <section className="content px-2 px-sm-3">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={"/productos/agregar"} className="btn btn-block btn-success btn-sm">
                                    Agregar Productos <i className="fa fa-plus"> </i>
                                </Link>
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover align-middle">
                                    <thead className="table-success">
                                        <tr>
                                            <th style={{ width: '35%', minWidth: '200px' }}>Nombre Producto</th>
                                            <th style={{ width: '13%', minWidth: '90px' }}>Unidades</th>
                                            <th style={{ width: '15%', minWidth: '120px' }}>Precio unitario</th>
                                            <th style={{ width: '15%', minWidth: '120px' }}>Precio total</th>
                                            {/* Ajustado el minWidth a 180px para dar espacio óptimo a los botones cuadrados */}
                                            <th style={{ width: '22%', minWidth: '180px' }} className="text-center">Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody className="table-info">
                                        {productos.map((producto, index) => (
                                            <tr key={index}>
                                                <td>{producto.nombre_producto}</td>
                                                <td>{producto.unidades}</td>
                                                <td>{producto.precio_unitario}</td>
                                                <td>{producto.precio_total}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>

                                                    {/* Contenedor centralizado libre de propiedades que aplasten la fila horizontal */}
                                                    <div className="d-flex flex-row justify-content-center align-items-center p-1">

                                                        {/* 
                                                          Botón Editar:
                                                          - mr-2 mr-md-3: 🌟 CLAVE para separar los botones de forma física garantizada.
                                                          - flex-column flex-md-row: Apila icono y texto en móvil (cuadrado) y los alinea en PC.
                                                        */}
                                                        <Link
                                                            to={`/productos/editar/${producto._id}`}
                                                            className="btn btn-sm btn-primary d-flex flex-column flex-md-row align-items-center justify-content-center p-2 lh-sm mr-2 mr-md-3 text-decoration-none"
                                                            style={{ width: '65px', height: '65px', minWidth: '100px', minHeight: '0px' }}
                                                        >
                                                            <i className="fa fa-pen mb-1 mb-md-0 mr-0 mr-md-2"></i>
                                                            <span style={{ fontSize: '1rem' }} className="d-block text-center font-weight-normal">Editar</span>
                                                        </Link>

                                                        {/* Botón Eliminar: Mismo tamaño simétrico */}
                                                        <button
                                                            onClick={(e) => eliminarProductos(e, producto._id)}
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

export default MostrarProductos;
