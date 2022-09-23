import { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import authContext from './authContext';
import { authReducer } from './authReducer';
import tokenAuth from '../../config/token';
import {
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from '../../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticate: null,
    user: null,
    message: null,
    loading: true
  };

  // Funciones

  //Retorna el usuario autenticado
  const loggedIn = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get('api/auth/profile');
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
  // Cuando el usuario inicia sesion
  const login = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/api/auth/signin', datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      localStorage.setItem('token', respuesta.data.token);
      // Obtener al usuario
      loggedIn();
    } catch (error) {
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  // Cerrar sesion de usuario
  const logout = ()=>{
    dispatch({
      type: CERRAR_SESION
    })
  }
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticate: state.autenticate,
        user: state.user,
        message: state.message,
        loading: state.loading,
        loggedIn,
        login,
        logout
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthState;
