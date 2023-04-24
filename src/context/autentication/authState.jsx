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
  CAMBIAR_PASSWORD,
  EDIT_ERROR,
  CAMBIAR_IMAGEN_PERFIL,
  RECUPERAR_PASS,
  RESET_MESSAGE,
  NUEVO_PASSWORD,
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
      tokenAuth(token, 'x-auth-token');
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
        type: EDIT_ERROR,
        payload: alerta,
      });
    }
  };

  const editPassword = async (data) => {
    try {
      const respuesta = await clienteAxios.put(`/api/auth/profile/pwd`, data);
      console.log(respuesta);
      dispatch({
        type: CAMBIAR_PASSWORD,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: EDIT_ERROR,
        payload: alerta,
      });
    }
  };
  const recuperarPassword = async (data) => {
    try {
      const respuesta = await clienteAxios.put(
        `/api/auth/forgot-password`,
        data
      );
      dispatch({
        type: RECUPERAR_PASS,
        payload: respuesta.data,
      });
      resetMessage();
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: EDIT_ERROR,
        payload: alerta,
      });
    }
    resetMessage();
  };
  const nuevoPassword = async (data) => {
    const { token, newPassword } = data;
    if (token) {
      tokenAuth(token, 'reset');
    }
    try {
      const respuesta = await clienteAxios.put('api/auth/new-password', {
        newPassword,
      });
      dispatch({
        type: NUEVO_PASSWORD,
        payload: respuesta.data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_ERROR,
      });
    }
    resetMessage();
  };

  const uploadProfileImage = async (data) => {
    try {
      const respuesta = await clienteAxios.put(`/api/auth/profile/img`, data);
      loggedIn();
      dispatch({
        type: CAMBIAR_IMAGEN_PERFIL,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: EDIT_ERROR,
        payload: alerta,
      });
    }
  };

  const resetMessage = async () => {
    setTimeout(() => {
      dispatch({
        type: RESET_MESSAGE,
      });
    }, 4000);
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
        editPassword,
        recuperarPassword,
        uploadProfileImage,
        resetMessage,
        nuevoPassword,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthState;
