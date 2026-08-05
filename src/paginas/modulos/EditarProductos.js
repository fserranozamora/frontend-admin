import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";

const EditarProductos = () => {
    const [nombre_producto, setNombProd] = useState("");
    const [unidades, setUnidades] = useState("");
    const [precio_unitario, setPrecioUni] = useState("");
    const [precio_total, setPrecioTotal] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const actualizarProductos = async (e) => {
        e.preventDefault();
        await APIInvoke.invokePUT(`/api/productos/${id}`, {
            nombre_producto: nombre_producto,
            unidades: unidades,
            precio_unitario: precio_unitario,
            precio_total: precio_total,
        });
        navigate("/productos");
    };

    useEffect(() => {
        getProductosID();
        // eslint-disable-next-line
    }, []);

    const getProductosID = async () => {
        const resultado = await APIInvoke.invokeGET(`/api/productos/${id}`);
        if (resultado) {
            setNombProd(resultado.nombre_producto || "");
            setUnidades(resultado.unidades || "");
            setPrecioUni(resultado.precio_unitario || "");
            setPrecioTotal(resultado.precio_total || "");
        }
    };

    // Recalcular precio total cuando cambie unidades o precio unitario
    const handleUnidadesChange = (e) => {
        const val = e.target.value;
        setUnidades(val);
        calcularTotal(val, precio_unitario);
    };

    const handlePrecioUniChange = (e) => {
        const val = e.target.value;
        setPrecioUni(val);
        calcularTotal(unidades, val);
    };

    const calcularTotal = (cant, precio) => {
        const c = parseFloat(cant) || 0;
        const p = parseFloat(precio) || 0;
        setPrecioTotal(c * p ? (c * p).toString() : "");
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper pb-2">
                <ContentHeader
                    titulo={"Editar productos"}
                    breadCrumb1={"Listado de productos"}
                    breadCrumb2={"Editar"}
                    ruta1={"/productos/editar"}
                />
                <section className="content px-2 px-sm-3">
                    <div className="container-fluid">
                        <div className="card card-primary shadow-sm">
                            <div className="card-header">
                                <h3 className="card-title">Editar Información de Producto</h3>
                                <div className="card-tools">
                                    <button
                                        type="button"
                                        className="btn btn-tool"
                                        data-card-widget="collapse"
                                        title="Collapse"
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-tool"
                                        data-card-widget="remove"
                                        title="Remove"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={actualizarProductos}>
                                <div className="card-body">
                                    <div className="row">

                                        {/* Nombre producto */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="nombre_producto">Nombre Producto</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-gift" /></span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="nombre_producto"
                                                    name="nombre_producto"
                                                    placeholder="Ingrese el nombre del producto"
                                                    value={nombre_producto}
                                                    onChange={(e) => setNombProd(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Unidades */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="unidades">Unidades</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-boxes" /></span>
                                                </div>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="form-control"
                                                    id="unidades"
                                                    name="unidades"
                                                    placeholder="Ingrese las unidades del producto"
                                                    value={unidades}
                                                    onChange={handleUnidadesChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Precio unitario */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="precio_unitario">Precio unitario</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-dollar-sign" /></span>
                                                </div>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    className="form-control"
                                                    id="precio_unitario"
                                                    name="precio_unitario"
                                                    placeholder="Ingrese su precio unitario"
                                                    value={precio_unitario}
                                                    onChange={handlePrecioUniChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Precio total */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="precio_total">Precio total</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-calculator" /></span>
                                                </div>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    className="form-control"
                                                    id="precio_total"
                                                    name="precio_total"
                                                    placeholder="Calculado automáticamente"
                                                    value={precio_total}
                                                    onChange={(e) => setPrecioTotal(e.target.value)}
                                                    readOnly
                                                    required
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card-footer d-flex flex-column flex-sm-row justify-content-end gap-2">
                                    <button type="submit" className="btn btn-info mb-2 mb-sm-0 mr-0 mr-sm-2">
                                        Guardar
                                    </button>
                                    <Link to="/productos" className="btn btn-danger">
                                        Cancelar
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default EditarProductos;