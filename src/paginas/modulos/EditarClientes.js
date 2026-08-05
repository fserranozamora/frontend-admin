import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";

const EditarClientes = () => {
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [cedula, setCedula] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const actualizarClientes = async (e) => {
        e.preventDefault();
        await APIInvoke.invokePUT(`/api/clientes/${id}`, {
            nombres: nombres,
            apellidos: apellidos,
            cedula: cedula,
            correo: correo,
            telefono: telefono,
            direccion: direccion,
        });
        navigate("/clientes");
    };

    useEffect(() => {
        getClientesID();
        // eslint-disable-next-line
    }, []);

    const getClientesID = async () => {
        const resultado = await APIInvoke.invokeGET(`/api/clientes/${id}`);
        if (resultado) {
            setNombres(resultado.nombres || "");
            setApellidos(resultado.apellidos || "");
            setCedula(resultado.cedula || "");
            setCorreo(resultado.correo || "");
            setTelefono(resultado.telefono || "");
            setDireccion(resultado.direccion || "");
        }
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper pb-2">
                <ContentHeader
                    titulo={"Editar clientes"}
                    breadCrumb1={"Listado de clientes"}
                    breadCrumb2={"Editar"}
                    ruta1={"/clientes/editar"}
                />
                <section className="content px-2 px-sm-3">
                    <div className="container-fluid">
                        <div className="card card-primary shadow-sm">
                            <div className="card-header">
                                <h3 className="card-title">Editar Información de Cliente</h3>
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

                            <form onSubmit={actualizarClientes}>
                                <div className="card-body">
                                    <div className="row">

                                        {/* Nombres */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="nombres">Nombres Cliente</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-user" /></span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="nombres"
                                                    name="nombres"
                                                    placeholder="Ingrese los nombres del cliente"
                                                    value={nombres}
                                                    onChange={(e) => setNombres(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Apellidos */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="apellidos">Apellidos</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-user" /></span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="apellidos"
                                                    name="apellidos"
                                                    placeholder="Ingrese los apellidos del cliente"
                                                    value={apellidos}
                                                    onChange={(e) => setApellidos(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Cédula */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="cedula">Cédula de ciudadanía</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-address-card" /></span>
                                                </div>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="cedula"
                                                    name="cedula"
                                                    placeholder="Ingrese la cédula de ciudadanía"
                                                    value={cedula}
                                                    onChange={(e) => setCedula(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Correo */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="correo">Correo</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-envelope" /></span>
                                                </div>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="correo"
                                                    name="correo"
                                                    placeholder="Ingrese el correo del cliente"
                                                    value={correo}
                                                    onChange={(e) => setCorreo(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Teléfono */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="telefono">Teléfono</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-phone" /></span>
                                                </div>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    id="telefono"
                                                    name="telefono"
                                                    placeholder="Ingrese el teléfono del cliente"
                                                    value={telefono}
                                                    onChange={(e) => setTelefono(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Dirección */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="direccion">Dirección</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-home" /></span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="direccion"
                                                    name="direccion"
                                                    placeholder="Ingrese la dirección del cliente"
                                                    value={direccion}
                                                    onChange={(e) => setDireccion(e.target.value)}
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
                                    <Link to="/clientes" className="btn btn-danger">
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

export default EditarClientes;