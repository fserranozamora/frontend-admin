import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Menu = () => {
    // Inicializa la navegación de React Router
    const navigate = useNavigate();
    // useLocation nos permite saber en qué página estamos para iluminar el botón activo
    const location = useLocation();

    // Función para limpiar el almacenamiento y redireccionar
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Función auxiliar para añadir la clase 'active' automáticamente al link actual
    const checkActive = (ruta) => {
        return location.pathname === ruta ? "active" : "";
    };

    return ( 
        // nav-sidebar y nav-flat controlan la estética y evitan desbordamientos en pantallas pequeñas
        <nav className="mt-2 px-2" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 60px)' }}>
            <ul 
                className="nav nav-pills nav-sidebar flex-column nav-flat nav-child-indent" 
                data-widget="treeview" 
                role="menu" 
                data-accordion="false"
            >
                {/* Opción: Inicio con Icono de Casa */}
                <li className="nav-item">
                    <Link to={"/home"} className={`nav-link ${checkActive("/home")}`}>
                        <i className="nav-icon fas fa-home text-primary" />
                        <p className="text-truncate">Inicio</p>
                    </Link>
                </li>

                {/* Opción: Clientes */}
                <li className="nav-item">
                    <Link to={"/clientes"} className={`nav-link ${checkActive("/clientes")}`}>
                        <i className="nav-icon fas fa-users text-success" />
                        <p className="text-truncate">Clientes</p>
                    </Link>
                </li>

                {/* Opción: Productos */}
                <li className="nav-item">
                    <Link to={"/productos"} className={`nav-link ${checkActive("/productos")}`}>
                        <i className="nav-icon fas fa-box text-warning" />
                        <p className="text-truncate">Productos</p>
                    </Link>
                </li>

                {/* Separador visual para computadoras y pantallas táctiles */}
                <li className="nav-header border-top my-2 pt-2 text-muted" style={{ fontSize: '0.8rem' }}>
                    CUENTA
                </li>

                {/* Botón de cerrar sesión integrado */}
                <li className="nav-item">
                    <span 
                        onClick={cerrarSesion} 
                        className="nav-link text-danger" 
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        <i className="nav-icon fas fa-sign-out-alt" />
                        <p className="text-truncate m-0">Salir</p>
                    </span>
                </li>
            </ul>
        </nav>
    );
}
 
export default Menu;
