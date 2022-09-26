import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import userContext from './userContext';
import { userReducer } from './userReducer';
import {
  AGREGAR_USUARIO,
  EDITAR_USUARIO,
  ELIMINAR_USUARIO,
  USUARIO_ERROR,
  USUARIO_ACTUAL,
  OBTENER_USUARIOS,
  ASCENDER_USUARIO,
  DESCENDER_USUARIO,
} from '../../types';

const userState = (props) => {
  const initialState = {
    users: [],
    user: null,
    message: null,
  };

  //Dispatch para ejecutar acciones
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Funciones
  const getUsers = async () => {
    try {
      const resultado = await clienteAxios.get('api/users');
      dispatch({
        type: OBTENER_USUARIOS,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: USUARIO_ERROR,
        payload: alerta,
      });
    }
  };
  //Agregar nuevo proyecto

  const addUser = async (user) => {
    try {
      const resultado = await clienteAxios.post('/api/users', user);
      //insertar el proyecto en el state
      dispatch({
        type: AGREGAR_USUARIO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: USUARIO_ERROR,
        payload: alerta,
      });
    }
  };

  // Selecciona el proyecto que el usuario dio click

  const currentUser = (userId) => {
    dispatch({
      type: USUARIO_ACTUAL,
      payload: userId,
    });
  };

  // Ascender usurio
  const ascendUser = async (userId) => {
    try {
      const resultado = await clienteAxios.put(`/api/users/up/${userId}`);
      //insertar el proyecto en el state
      const alerta = {
        msg: resultado.data.msg,
        categoria: 'success',
      };
      dispatch({
        type: ASCENDER_USUARIO,
        payload: {userId, alerta},
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: USUARIO_ERROR,
        payload: alerta,
      });
    }
  };

  // Descender usurio
  const descendUser = async (userId) => {
    try {
      const resultado = await clienteAxios.put(`/api/users/down/${userId}`);
      //insertar el proyecto en el state
      const alerta = {
        msg: resultado.data.msg,
        categoria: 'success',
      };
      dispatch({
        type: DESCENDER_USUARIO,
        payload: {userId, alerta},
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: USUARIO_ERROR,
        payload: alerta,
      });
    }
  };

  // Elimina proyecto

  const deleteUser = async (userId) => {
    try {
      await clienteAxios.delete(`/api/users/${userId}`);
      dispatch({
        type: ELIMINAR_USUARIO,
        payload: userId,
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: USUARIO_ERROR,
        payload: alerta,
      });
    }
  };
  return (
    <userContext.Provider
      value={{
        users: state.users,
        user: state.user,
        message: state.message,
        getUsers,
        addUser,
        currentUser,
        ascendUser,
        descendUser,
        deleteUser,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default userState;
