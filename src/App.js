import React, {Fragment} from "react";
import { BrowserRouter as Router,Route,Routes, Navigate } from "react-router-dom";
import Login from "./paginas/auth/Login";
import Registro from "./paginas/auth/Registro";
import Home from "./Home";
import MostrarClientes from "./paginas/modulos/MostrarClientes";
import AgregarClientes from "./paginas/modulos/AgregarClientes";
import EditarClientes from "./paginas/modulos/EditarClientes";
import MostrarProductos from "./paginas/modulos/MostrarProductos";
import AgregarProductos from "./paginas/modulos/AgregarProductos";
import EditarProductos from "./paginas/modulos/EditarProductos";
import RutasProtegidas from "./paginas/auth/RutasProtegidas";



function App() {
  return (
    <div className="App">
      <Fragment>
        <Router>
          <Routes>
            <Route path="/" element ={<Navigate to = "/login"/>}></Route>
            <Route path="/login" exact element ={<Login/>}></Route>
            <Route path="/Registro" exact element ={<Registro/>}></Route>
            <Route path="/home" exact element ={<RutasProtegidas element={<Home/>}/>}></Route>
            <Route path="/clientes" exact element ={<RutasProtegidas element={<MostrarClientes/>}/>}></Route>
            <Route path="/clientes/agregar" exact element ={<RutasProtegidas element={<AgregarClientes/>}/>}></Route>
            <Route path="/clientes/editar/:id" exact element ={<RutasProtegidas element={<EditarClientes/>}/>}></Route>
            <Route path="/productos" exact element ={<RutasProtegidas element={<MostrarProductos/>}/>}></Route>
            <Route path="/productos/agregar" exact element ={<RutasProtegidas element={<AgregarProductos/>}/>}></Route>
            <Route path="/productos/editar/:id" exact element ={<RutasProtegidas element={<EditarProductos/>}/>}></Route>

          </Routes>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;