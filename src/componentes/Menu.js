import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {
    // Inicializa la navegación de React Router
    const navigate = useNavigate();

    // Función para limpiar el almacenamiento y redireccionar
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return ( 
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>Inicio</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/clientes"} className="nav-link">
                        <i className="nav-icon fas fa-edit" />
                        <p>Clientes</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/productos"} className="nav-link">
                        <i className="nav-icon fas fa-edit" />
                        <p>Productos</p>
                    </Link>
                </li>
                {/* Botón de cerrar sesión integrado */}
                <li className="nav-item">
                    <span 
                        onClick={cerrarSesion} 
                        className="nav-link" 
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="nav-icon fas fa-sign-out-alt" />
                        <p>Salir</p>
                    </span>
                </li>
            </ul>
        </nav>
    );
}
 
export default Menu;
