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

                {/* Corrección de seccion a section */}
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={"/productos/agregar"} className="btn btn-block btn-success btn-sm"> 
                                    Agregar Productos <i className="fa fa-plus"> </i>
                                </Link>
                            </h3>
                        </div>
                        <div className="card-body">
                            {/* table-responsive previene que la tabla se rompa en pantallas de celulares o tablets */}
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover align-middle">
                                    <thead className="table-success">
                                        <tr>
                                            {/* Redistribución de anchuras y tamaños mínimos obligatorios */}
                                            <th style={{ width: '35%', minWidth: '200px' }}>Nombre Producto</th>
                                            <th style={{ width: '13%', minWidth: '90px' }}>Unidades</th>
                                            <th style={{ width: '15%', minWidth: '120px' }}>Precio unitario</th>
                                            <th style={{ width: '15%', minWidth: '120px' }}>Precio total</th>
                                            {/* Espacio ampliado al 22% para permitir la separación extrema horizontal de los botones */}
                                            <th style={{ width: '22%', minWidth: '220px' }} className="text-center">Acciones</th>
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
                                                      Estructura híbrida adaptable:
                                                      - Móviles: Botones apilados (flex-column) con gap-2
                                                      - Computadoras/Tablets: Botones horizontales (flex-sm-row) con separación máxima (gap-sm-5)
                                                    */}
                                                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-5 px-0 px-sm-4">
                                                        <Link 
                                                            to={`/productos/editar/${producto._id}`} 
                                                            className='btn btn-sm btn-primary w-100'
                                                        >
                                                            <i className="fa fa-pen"></i> Editar
                                                        </Link>
                                                        <p className="d-flex flex-column flex-sm-row justify-content-center gap- gap-sm-0 px-0 px-sm-2"></p>
                                                        <button 
                                                            onClick={(e) => eliminarProductos(e, producto._id)} 
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

export default MostrarProductos;
