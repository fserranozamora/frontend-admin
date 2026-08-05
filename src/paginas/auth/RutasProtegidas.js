import React, {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import swal from 'sweetalert';

const RutasProtegidas = ({ element} ) => {
const [ redirec, setRedirec ] = useState(false);

//funcion para la expiración del token

const TokenExp = () => {
  const token = localStorage.getItem("token");
  if(!token){
    //si no tenemos un token nos envía a la página inicial
    setRedirec(true);
    return;
  }

  //decodificar el token para tener una fecha de expiración
  const token0 = JSON.parse(atob(token.split(".")[1]));
  const timeexp = token0.exp * 1000; // conversión a milisegundos

  // obtención de la hora actual

  const actualTime = Date.now();

  if(actualTime >= timeexp){
    swal({
      title: 'Su sesión ha sido expirada',
      text: 'Su sesión ha sido expirada, vuelve a iniciar sesión',
      icon: 'warning',
      buttons:{
          confirm:{
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

useEffect(() => {
  const timeout = setInterval(TokenExp, 100);
  return() => clearInterval(timeout);// limpia si desmonta el componente
}, []);

if(redirec){
  return <Navigate to="/login"/>
}
// reenderizar la ruta
  return element;
  
};

export default RutasProtegidas;