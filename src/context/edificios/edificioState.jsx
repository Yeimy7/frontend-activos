import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import edificioContext from './edificioContext';
import { edificioReducer } from './edificioReducer';
import {
  AGREGAR_EDIFICIO,
  BAJA_EDIFICIO,
  OBTENER_EDIFICIOS,
  EDIFICIO_ERROR,
  EDIFICIO_ACTUAL,
  LIMPIAR_EDIFICIO,
  ACTUALIZAR_EDIFICIO,
  PISOS_EDIFICIO,
  RESET_MESSAGE,
  LIMPIAR_PISOS_EDIFICIO,
} from '../../types';

const edificioState = (props) => {
  const initialState = {
    edificios: [],
    edificio: null,
    pisosEdificio: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(edificioReducer, initialState);
  // Registrar edificio
  const registrarEdificio = async (edificio) => {
    try {
      const resultado = await clienteAxios.post('/api/edificios', edificio);
      dispatch({
        type: AGREGAR_EDIFICIO,
        payload: resultado.data,
      });
      resetMensaje();
    } catch (error) {
      dispatch({
        type: EDIFICIO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };
  // Obtener edificios
  const obtenerEdificios = async () => {
    try {
      const resultado = await clienteAxios.get('/api/edificios');
      dispatch({
        type: OBTENER_EDIFICIOS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: EDIFICIO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };
  // Actualizar edificio
  const actualizarEdificio = async (edificio) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/edificios/${edificio.id_edificio}`,
        edificio
      );
      dispatch({
        type: ACTUALIZAR_EDIFICIO,
        payload: resultado.data,
      });
      resetMensaje();
    } catch (error) {
      dispatch({
        type: EDIFICIO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };

  const seleccionarEdificio = (id_edificio) => {
    dispatch({
      type: EDIFICIO_ACTUAL,
      payload: id_edificio,
    });
  };
  const seleccionarPisosEdificio = (id_edificio) => {
    dispatch({
      type: PISOS_EDIFICIO,
      payload: id_edificio,
    });
  };
  const limpiarEdificio = () => {
    dispatch({
      type: LIMPIAR_EDIFICIO,
    });
  };
  const limpiarPisosEdificio = () => {
    dispatch({
      type: LIMPIAR_PISOS_EDIFICIO,
    });
  };
  // Eliminar edificio
  const eliminarEdificio = async (id_edificio) => {
    try {
      await clienteAxios.put(`/api/edificios/baja/${id_edificio}`);
      dispatch({
        type: BAJA_EDIFICIO,
        payload: id_edificio,
      });
      resetMensaje();
    } catch (error) {
      dispatch({
        type: EDIFICIO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };
  const resetMensaje = async () => {
    setTimeout(() => {
      dispatch({
        type: RESET_MESSAGE,
      });
    }, 4000);
  };
  return (
    <edificioContext.Provider
      value={{
        edificios: state.edificios,
        edificio: state.edificio,
        pisosEdificio: state.pisosEdificio,
        mensaje: state.mensaje,
        registrarEdificio,
        obtenerEdificios,
        actualizarEdificio,
        eliminarEdificio,
        seleccionarEdificio,
        seleccionarPisosEdificio,
        limpiarEdificio,
        limpiarPisosEdificio,
        resetMensaje,
      }}
    >
      {props.children}
    </edificioContext.Provider>
  );
};
export default edificioState;
