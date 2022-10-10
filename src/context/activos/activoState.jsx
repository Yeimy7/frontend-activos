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
  OBTENER_ACTIVOS_ASIGNADOS,
  OBTENER_ACTIVOS_NO_ASIGNADOS,
  ASIGNAR_ACTIVO,
  DESVINCULAR_ACTIVO,
  ACTIVO_A_DEVOLVER,
  LIMPIAR_ACTIVO_A_DEVOLVER,
} from '../../types';

const activoState = (props) => {
  const initialState = {
    activo: null,
    activoADevolver: null,
    activos: [],
    activosAsignados: [],
    activosNoAsignados: [],
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
  const obtenerActivosAsignados = async () => {
    try {
      const resultado = await clienteAxios.get('/api/asignados');
      dispatch({
        type: OBTENER_ACTIVOS_ASIGNADOS,
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

  const obtenerActivosNoAsignados = async () => {
    try {
      const resultado = await clienteAxios.get('/api/asignados/no');
      dispatch({
        type: OBTENER_ACTIVOS_NO_ASIGNADOS,
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
  const asignarActivo = async (data) => {
    try {
      const resultado = await clienteAxios.put(`/api/asignados`, data);
      dispatch({
        type: ASIGNAR_ACTIVO,
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

  const desvincularActivo = async (id_activo) => {
    try {
      const resultado = await clienteAxios.put(`/api/asignados/desvincular`, id_activo);
      dispatch({
        type: DESVINCULAR_ACTIVO,
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

  const seleccionarActivoADevolver = (id_activo) => {
    dispatch({
      type: ACTIVO_A_DEVOLVER,
      payload: id_activo,
    });
  };
  const limpiarActivoADevolver = () => {
    dispatch({
      type: LIMPIAR_ACTIVO_A_DEVOLVER,
    });
  };

  return (
    <activoContext.Provider
      value={{
        activo: state.activo,
        activoADevolver: state.activoADevolver,
        activos: state.activos,
        activosAsignados: state.activosAsignados,
        activosNoAsignados: state.activosNoAsignados,
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
        limpiarActivoADevolver,
        obtenerActivosAsignados,
        obtenerActivosNoAsignados,
        asignarActivo,
        desvincularActivo,
        seleccionarActivoADevolver,
      }}
    >
      {props.children}
    </activoContext.Provider>
  );
};
export default activoState;
