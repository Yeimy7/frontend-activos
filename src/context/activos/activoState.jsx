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
  EDITAR_IMAGEN_ACTIVO,
  OBTENER_ACTIVOS_ASIGNADOS,
  OBTENER_ACTIVOS_NO_ASIGNADOS,
  ASIGNAR_ACTIVO,
  DESVINCULAR_ACTIVO,
  ACTIVO_A_DEVOLVER,
  LIMPIAR_ACTIVO_A_DEVOLVER,
  ACTIVO_BAJA,
  LIMPIAR_ACTIVO_BAJA,
  ACTIVO_A_TRASLADAR,
  LIMPIAR_ACTIVO_A_TRASLADAR,
  TRASLADO_ACTIVO,
  OBTENER_TOTAL_ACTIVOS,
  OBTENER_TOTAL_ASIGNADOS,
  ACTIVO_OBTENER_TOTAL_GRUPOS,
  AGREGAR_CODIGO_ACTIVOS,
  ELIMINAR_CODIGO_ACTIVO,
  LIMPIAR_CODIGO_ACTIVOS,
  RESET_MESSAGE,
  RESET_MESSAGE_NOW,
} from '../../types';

const activoState = (props) => {
  const initialState = {
    activo: null,
    activoADevolver: null,
    activoBaja: null,
    activoTraslado: null,
    activos: [],
    totalActivos: null,
    totalActivosAsignados: null,
    activosAsignados: [],
    activosNoAsignados: [],
    imagenActivo: false,
    mensaje: null,
    auxiliares: [],
    grupos: [],
    totalGrupos: [],
    ambientes: [],
    codigoActivos: [],
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
      resetMensaje();
    } catch (error) {
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
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
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };
  const obtenerTotalActivos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/activos/total');
      dispatch({
        type: OBTENER_TOTAL_ACTIVOS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
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
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
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
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };

  const obtenerTotalGrupos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/grupos/total');
      dispatch({
        type: ACTIVO_OBTENER_TOTAL_GRUPOS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
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
      resetMensaje();
    } catch (error) {
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };

  const actualizarImagenActivo = async (activo) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/activos/img/${activo.id_activo}`,
        activo.img_activo
      );
      dispatch({
        type: ACTUALIZAR_IMAGEN_ACTIVO,
        payload: resultado.data,
      });
      resetMensaje();
    } catch (error) {
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
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
      resetMensaje();
    } catch (error) {
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };
  const seleccionarActivoBaja = (id_activo) => {
    dispatch({
      type: ACTIVO_BAJA,
      payload: id_activo,
    });
  };
  const limpiarActivoBaja = () => {
    dispatch({
      type: LIMPIAR_ACTIVO_BAJA,
    });
  };
  const obtenerTotalAsignados = async () => {
    try {
      const resultado = await clienteAxios.get('/api/asignados/total');
      dispatch({
        type: OBTENER_TOTAL_ASIGNADOS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
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
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
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
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };
  const asignarActivo = async (data) => {
    try {
      const resultado = await clienteAxios.put(`/api/asignados`, data);
      dispatch({
        type: ASIGNAR_ACTIVO,
        payload: resultado.data,
      });
      resetMensaje()
    } catch (error) {
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };

  const desvincularActivo = async (id_activo) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/asignados/desvincular`,
        id_activo
      );
      dispatch({
        type: DESVINCULAR_ACTIVO,
        payload: resultado.data,
      });
      resetMensaje()
    } catch (error) {
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
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

  const trasladarActivo = async (data) => {
    try {
      const resultado = await clienteAxios.put(`/api/trasladar`, data);
      dispatch({
        type: TRASLADO_ACTIVO,
        payload: resultado.data,
      });
      resetMensaje()
    } catch (error) {
      dispatch({
        type: ACTIVO_ERROR,
        payload: error.response.data
      });
      resetMensaje()
    }
  };
  const seleccionarActivoTraslado = (id_activo) => {
    dispatch({
      type: ACTIVO_A_TRASLADAR,
      payload: id_activo,
    });
  };
  const limpiarActivoTraslado = () => {
    dispatch({
      type: LIMPIAR_ACTIVO_A_TRASLADAR,
    });
  };

  const agregarCodigoActivos = (activo) => {
    dispatch({
      type: AGREGAR_CODIGO_ACTIVOS,
      payload: activo,
    });
  };
  const eliminarCodigoActivo = (activo) => {
    dispatch({
      type: ELIMINAR_CODIGO_ACTIVO,
      payload: activo,
    });
  };
  const limpiarCodigoActivos = () => {
    dispatch({
      type: LIMPIAR_CODIGO_ACTIVOS,
    });
  };
  const resetMensaje = async () => {
    setTimeout(() => {
      dispatch({
        type: RESET_MESSAGE,
      });
    }, 4000);
  };
  const resetMensajeNow = async () => {
    dispatch({
      type: RESET_MESSAGE_NOW,
    });
  };

  return (
    <activoContext.Provider
      value={{
        activo: state.activo,
        activoADevolver: state.activoADevolver,
        activoBaja: state.activoBaja,
        activoTraslado: state.activoTraslado,
        activos: state.activos,
        totalActivos: state.totalActivos,
        totalActivosAsignados: state.totalActivosAsignados,
        activosAsignados: state.activosAsignados,
        activosNoAsignados: state.activosNoAsignados,
        imagenActivo: state.imagenActivo,
        mensaje: state.mensaje,
        auxiliares: state.auxiliares,
        grupos: state.grupos,
        totalGrupos: state.totalGrupos,
        codigoActivos: state.codigoActivos,
        registrarActivo,
        obtenerActivos,
        obtenerTotalActivos,
        obtenerAuxiliares,
        obtenerGrupos,
        obtenerTotalGrupos,
        actualizarActivo,
        editarImagen,
        actualizarImagenActivo,
        eliminarActivo,
        seleccionarActivo,
        seleccionarActivoADevolver,
        seleccionarActivoBaja,
        seleccionarActivoTraslado,
        limpiarActivo,
        limpiarActivoADevolver,
        limpiarActivoBaja,
        limpiarActivoTraslado,
        obtenerTotalAsignados,
        obtenerActivosAsignados,
        obtenerActivosNoAsignados,
        asignarActivo,
        desvincularActivo,
        trasladarActivo,
        agregarCodigoActivos,
        eliminarCodigoActivo,
        limpiarCodigoActivos,
        resetMensajeNow,
        resetMensaje,
      }}
    >
      {props.children}
    </activoContext.Provider>
  );
};
export default activoState;
