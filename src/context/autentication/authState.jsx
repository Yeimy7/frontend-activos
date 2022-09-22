import { useReducer } from 'react';
import { authReducer } from './authReducer';
import authContext from './authContext';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
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
  const registerUser = async (datos) => {
    try {
      const response = await clienteAxios.post('/api/users', datos);
      console.log(response);
      dispatch({
        type: REGISTRO_EXITOSO,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTRO_ERROR,
      });
    }
  };

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
      console.log(error);
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
        registerUser,
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
