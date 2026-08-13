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
                                            {/* 🌟 Ajustado el minWidth a 240px para que el texto de ambos botones quepa holgadamente codo a codo */}
                                            <th style={{ width: '22%', minWidth: '240px' }} className="text-center">Acciones</th>
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

                                                    {/* 
                                                      🌟 CORRECCIÓN ESTRUCTURAL:
                                                      - flex-row mantiene los botones horizontales siempre (celulares y PC).
                                                      - gap-4 crea la separación de 24px ideal entre ambos.
                                                      - px-3 evita que los botones toquen los bordes de la celda.
                                                    */}
                                                    <div className="d-flex flex-row justify-content-center align-items-center gap-4 px-3">

                                                        {/* Botón Editar */}
                                                        <Link
                                                            to={`/productos/editar/${producto._id}`}
                                                            className='btn btn-sm btn-primary w-100 d-flex align-items-center justify-content-center py-1'
                                                            style={{ minWidth: '95px' }}
                                                        >
                                                            <i className="fa fa-pen mr-2"></i> Editar
                                                        </Link>
                                                        <p className="d-flex flex-column flex-sm-row justify-content-center gap- gap-sm-0 px-2 px-sm-2"></p>
                                                        {/* Botón Eliminar */}
                                                        <button
                                                            onClick={(e) => eliminarProductos(e, producto._id)}
                                                            className='btn btn-sm btn-danger w-100 d-flex align-items-center justify-content-center py-1'
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

export default MostrarProductos;
