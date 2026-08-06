import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";
import swal from "sweetalert";

const AgregarProductos = () => {
  const navigate = useNavigate();

  const [productos, setProductos] = useState({
    nombre_producto: "",
    unidades: "",
    precio_unitario: "",
    precio_total: ""
  });

  const { nombre_producto, unidades, precio_unitario, precio_total } = productos;

  useEffect(() => {
    const inputFocus = document.getElementById("nombre_producto");
    if (inputFocus) {
      inputFocus.focus();
    }
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    const nuevosProductos = { ...productos, [name]: value };

    // Cálculo automático del precio total
    if (name === "unidades" || name === "precio_unitario") {
      const cant = parseFloat(name === "unidades" ? value : productos.unidades) || 0;
      const precio = parseFloat(name === "precio_unitario" ? value : productos.precio_unitario) || 0;
      nuevosProductos.precio_total = (cant * precio) > 0 ? (cant * precio).toString() : "";
    }

    setProductos(nuevosProductos);
  };

  const CrearProductos = async () => {
    try {
      const data = {
        nombre_producto: productos.nombre_producto,
        unidades: productos.unidades,
        precio_unitario: productos.precio_unitario,
        precio_total: productos.precio_total
      };

      const response = await APIInvoke.invokePOST('/api/productos', data);
      const idProducto = response?._id;

      if (!idProducto) {
        swal({
          title: 'Error',
          text: "Hubo un error al agregar un producto",
          icon: 'error',
          buttons: { confirm: { text: 'OK', className: 'btn btn-danger' } }
        });
      } else {
        swal({
          title: 'Información',
          text: "El producto fue agregado con éxito",
          icon: 'success',
          buttons: { confirm: { text: 'OK', className: 'btn btn-primary' } }
        });

        navigate("/productos");
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    CrearProductos();
  };

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainer />

      <div className="content-wrapper">
        <ContentHeader
          titulo={"Agregar Productos"}
          breadCrumb1={"Listado de Productos"}
          breadCrumb2={"Agregar"}
          ruta1={"/productos/agregar"}
        />

        <section className="content px-2 px-sm-3">
          <div className="container-fluid">
            <div className="card card-primary shadow-sm">
              <div className="card-header">
                <h3 className="card-title">Datos del Producto</h3>
              </div>

              <form onSubmit={onSubmit}>
                <div className="card-body">
                  <div className="row">

                    {/* Nombre producto */}
                    <div className="col-12 col-md-6 form-group">
                      <label htmlFor="nombre_producto">Nombre del producto</label>
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
                          onChange={onChange}
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
                          placeholder="Ingrese las unidades"
                          value={unidades}
                          onChange={onChange}
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
                          placeholder="Ingrese precio unitario"
                          value={precio_unitario}
                          onChange={onChange}
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
                          onChange={onChange}
                          readOnly
                          required
                        />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="card-footer d-flex flex-column flex-sm-row justify-content-end">
                  <button type="submit" className="btn btn-primary mb-2 mb-sm-0 mr-0 mr-sm-2">
                    Agregar
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

export default AgregarProductos;
