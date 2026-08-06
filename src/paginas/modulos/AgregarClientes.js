import React, { useState, useEffect } from "react";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import APIInvoke from "../../configuracion/APIInvoke";
import SidebarContainer from "../../componentes/SidebarContainer";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";

const AgregarClientes = () => {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    correo: "",
    telefono: "",
    direccion: ""
  });

  const { nombres, apellidos, cedula, correo, telefono, direccion } = clientes;

  useEffect(() => {
    document.getElementById("nombres")?.focus();
  }, []);

  const onChange = (e) => {
    setClientes({
      ...clientes,
      [e.target.name]: e.target.value
    });
  };

  const CrearClientes = async () => {
    try {
      const data = {
        nombres: clientes.nombres,
        apellidos: clientes.apellidos,
        cedula: clientes.cedula,
        correo: clientes.correo,
        telefono: clientes.telefono,
        direccion: clientes.direccion
      };

      const response = await APIInvoke.invokePOST('/api/clientes', data);
      
      // Abre la consola (F12) para ver la estructura exacta que retorna tu API
      console.log("Respuesta de la API:", response);

      // Acepta _id, id, o un mensaje positivo de la API
      const esExitoso = response && (response._id || response.id || response.msg === "Cliente creado" || response.status === "ok");

      if (esExitoso) {
        swal({
          title: 'Información',
          text: "El cliente fue agregado con éxito",
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

        setClientes({
          nombres: "",
          apellidos: "",
          cedula: "",
          correo: "",
          telefono: "",
          direccion: ""
        });

        navigate("/clientes");
      } else {
        const mensajeServidor = response?.msg || response?.mensaje || "Hubo un error al agregar un cliente";
        swal({
          title: 'Error',
          text: mensajeServidor,
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
      console.error("Error al conectar con el servidor:", error);
      swal({
        title: 'Error de Conexión',
        text: "No se pudo comunicar con el servidor backend.",
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            className: 'btn btn-danger'
          }
        }
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    CrearClientes();
  };

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainer />

      <div className="content-wrapper">
        <ContentHeader
          titulo={"Agregar Clientes"}
          breadCrumb1={"Listado de Clientes"}
          breadCrumb2={"Agregar"}
          ruta1={"/clientes/agregar"}
        />

        <section className="content px-2 px-sm-3">
          <div className="container-fluid">
            <div className="card card-primary shadow-sm">
              <div className="card-header">
                <h3 className="card-title">Datos del Cliente</h3>
              </div>

              <form onSubmit={onSubmit}>
                <div className="card-body">
                  <div className="row">
                    
                    {/* Nombres */}
                    <div className="col-12 col-md-6 form-group">
                      <label htmlFor="nombres">Nombres</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="fas fa-user" /></span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="nombres"
                          name="nombres"
                          placeholder="Ingrese los nombres"
                          value={nombres}
                          onChange={onChange}
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
                          placeholder="Ingrese los apellidos"
                          value={apellidos}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Cédula */}
                    <div className="col-12 col-md-6 form-group">
                      <label htmlFor="cedula">Cédula</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="fas fa-address-card" /></span>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          id="cedula"
                          name="cedula"
                          placeholder="Ingrese la cédula"
                          value={cedula}
                          onChange={onChange}
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
                          placeholder="Ingrese el correo electrónico"
                          value={correo}
                          onChange={onChange}
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
                          placeholder="Ingrese el teléfono"
                          value={telefono}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Dirección */}
                    <div className="col-12 col-md-6 form-group">
                      <label htmlFor="direccion">Dirección</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="fa fa-home" /></span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="direccion"
                          name="direccion"
                          placeholder="Ingrese la dirección"
                          value={direccion}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="card-footer d-flex flex-column flex-sm-row justify-content-end gap-2">
                  <button type="submit" className="btn btn-primary mb-2 mb-sm-0 mr-0 mr-sm-2">
                    Agregar
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

export default AgregarClientes;
