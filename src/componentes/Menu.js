import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 🌟 CONTROL RESPONSIVE TOTAL: Limpia el Navbar, el Body y el Overlay al cambiar de ruta
    useEffect(() => {
        const body = document.querySelector('body');
        
        // 1. Detectar si estamos en celular o tablet (Pantallas menores a 992px)
        if (window.innerWidth < 992 && body) {
            
            // 2. Remover de forma forzada las clases que mantienen el menú visible en la pantalla
            body.classList.remove('sidebar-open');
            body.classList.add('sidebar-collapse');
            body.classList.add('sidebar-closed');

            // 3. ⚠️ ELIMINAR EL OVERLAY: Borramos el fondo oscuro que bloquea la página y el navbar
            const overlay = document.getElementById('sidebar-overlay');
            if (overlay) {
                overlay.remove(); 
            }
        }
    }, [location.pathname]); // Se dispara instantáneamente cada vez que haces clic en una opción

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const checkActive = (ruta) => {
        return location.pathname.startsWith(ruta) ? "active" : "";
    };

    return ( 
        <nav className="mt-2 px-2" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 60px)' }}>
            <ul 
                className="nav nav-pills nav-sidebar flex-column nav-flat nav-child-indent" 
                data-widget="treeview" 
                role="menu" 
                data-accordion="false"
            >
                <li className="nav-item">
                    <Link to={"/home"} className={`nav-link ${checkActive("/home")}`}>
                        <i className="nav-icon fas fa-home text-mute" />
                        <p className="text-truncate">Inicio</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/clientes"} className={`nav-link ${checkActive("/clientes")}`}>
                        <i className="nav-icon fas fa-users text-success" />
                        <p className="text-truncate">Clientes</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/productos"} className={`nav-link ${checkActive("/productos")}`}>
                        <i className="nav-icon fas fa-box text-warning" />
                        <p className="text-truncate">Productos</p>
                    </Link>
                </li>
                <li className="nav-header border-top my-2 pt-2 text-muted" style={{ fontSize: '0.8rem' }}>
                    CUENTA
                </li>
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
