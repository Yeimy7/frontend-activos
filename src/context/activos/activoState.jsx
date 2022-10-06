import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import activoContext from './activoContext';
import { activoReducer } from './activoReducer';
import {
  AGREGAR_ACTIVO,
  BAJA_ACTIVO,
  OBTENER_ACTIVOS,
  ACTIVO_ERROR,
  ACTIVO_ACTUAL,
  LIMPIAR_ACTIVO,
  ACTUALIZAR_ACTIVO,
  ACTUALIZAR_IMAGEN_ACTIVO,
  ACTIVO_OBTENER_AUXILIARES,
  ACTIVO_OBTENER_GRUPOS,
  ACTIVO_OBTENER_AMBIENTES,
  EDITAR_IMAGEN_ACTIVO,
} from '../../types';

const activoState = (props) => {
  const initialState = {
    activos: [],
    activo: null,
    imagenActivo: false,
    mensaje: null,
    auxiliares: [],
    grupos: [],
    ambientes: [],
  };

  const [state, dispatch] = useReducer(activoReducer, initialState);
  // Registrar activo
  const registrarActivo = async (activo) => {
    try {
      const resultado = await clienteAxios.post('/api/activos', activo);
      dispatch({
        type: AGREGAR_ACTIVO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: ACTIVO_ERROR,
        payload: alerta,
      });
    }
  };
  // Obtener activos
  const obtenerActivos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/activos');
      dispatch({
        type: OBTENER_ACTIVOS,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: ACTIVO_ERROR,
        payload: alerta,
      });
    }
  };

  const obtenerAuxiliares = async () => {
    try {
      const resultado = await clienteAxios.get('/api/auxiliares');
      dispatch({
        type: ACTIVO_OBTENER_AUXILIARES,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: ACTIVO_ERROR,
        payload: alerta,
      });
    }
  };

  const obtenerGrupos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/grupos');
      dispatch({
        type: ACTIVO_OBTENER_GRUPOS,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: ACTIVO_ERROR,
        payload: alerta,
      });
    }
  };

  const obtenerAmbientes = async () => {
    try {
      const resultado = await clienteAxios.get('/api/ambientes');
      dispatch({
        type: ACTIVO_OBTENER_AMBIENTES,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: ACTIVO_ERROR,
        payload: alerta,
      });
    }
  };
  // Actualizar activo
  const actualizarActivo = async (activo) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/activos/${activo.id_activo}`,
        activo
      );
      dispatch({
        type: ACTUALIZAR_ACTIVO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: ACTIVO_ERROR,
        payload: alerta,
      });
    }
  };

  const actualizarImagenActivo = async (activo) => {
    console.log(activo);
    try {
      const resultado = await clienteAxios.put(
        `/api/activos/img/${activo.id_activo}`,
        activo.img_activo
      );
      dispatch({
        type: ACTUALIZAR_IMAGEN_ACTIVO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: ACTIVO_ERROR,
        payload: alerta,
      });
    }
  };

  const editarImagen = (id_activo) => {
    dispatch({
      type: EDITAR_IMAGEN_ACTIVO,
      payload: id_activo,
    });
  };
  const seleccionarActivo = (id_activo) => {
    dispatch({
      type: ACTIVO_ACTUAL,
      payload: id_activo,
    });
  };
  const limpiarActivo = () => {
    dispatch({
      type: LIMPIAR_ACTIVO,
    });
  };
  // Eliminar activo
  const eliminarActivo = async (id_activo) => {
    try {
      await clienteAxios.put(`/api/activos/down/${id_activo}`);
      dispatch({
        type: BAJA_ACTIVO,
        payload: id_activo,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: ACTIVO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <activoContext.Provider
      value={{
        activos: state.activos,
        activo: state.activo,
        imagenActivo: state.imagenActivo,
        mensaje: state.mensaje,
        auxiliares: state.auxiliares,
        grupos: state.grupos,
        ambientes: state.ambientes,
        registrarActivo,
        obtenerActivos,
        obtenerAuxiliares,
        obtenerGrupos,
        obtenerAmbientes,
        actualizarActivo,
        editarImagen,
        actualizarImagenActivo,
        eliminarActivo,
        seleccionarActivo,
        limpiarActivo,
      }}
    >
      {props.children}
    </activoContext.Provider>
  );
};
export default activoState;
