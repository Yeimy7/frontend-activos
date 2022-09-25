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
  EDITAR_USUARIO,
  HABILITAR_EDICION_USUARIO,
} from '../../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticate: null,
    user: null,
    message: null,
    loading: true,
    edit: false,
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
  const logout = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  const enableEdit = () => {
    dispatch({
      type: HABILITAR_EDICION_USUARIO,
    });
  };
  const editUser = async (data) => {
    try {
      await clienteAxios.put(`/api/auth/profile`, data);
      loggedIn();
      const alerta = {
        msg: 'Datos de usuario actualizados correctamente',
        categoria: 'success',
      };
      dispatch({
        type: EDITAR_USUARIO,
        payload: alerta,
      });
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
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticate: state.autenticate,
        user: state.user,
        message: state.message,
        loading: state.loading,
        edit: state.edit,
        loggedIn,
        login,
        logout,
        enableEdit,
        editUser,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthState;
