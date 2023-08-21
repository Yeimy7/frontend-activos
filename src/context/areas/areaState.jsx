import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import areaContext from './areaContext';
import { areaReducer } from './areaReducer';
import {
  AGREGAR_AREA,
  BAJA_AREA,
  OBTENER_AREAS,
  AREA_ERROR,
  AREA_ACTUAL,
  LIMPIAR_AREA,
  ACTUALIZAR_AREA,
  RESET_MESSAGE,
} from '../../types';

const areaState = (props) => {
  const initialState = {
    areas: [],
    area: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(areaReducer, initialState);
  // Registrar area
  const registrarArea = async (area) => {
    try {
      const resultado = await clienteAxios.post('/api/areas', area);
      dispatch({
        type: AGREGAR_AREA,
        payload: resultado.data,
      });
      resetMensaje();
    } catch (error) {
      dispatch({
        type: AREA_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };
  // Obtener areas
  const obtenerAreas = async () => {
    try {
      const resultado = await clienteAxios.get('/api/areas');
      dispatch({
        type: OBTENER_AREAS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: AREA_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };
  // Actualizar area
  const actualizarArea = async (area) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/areas/${area.id_area}`,
        area
      );
      dispatch({
        type: ACTUALIZAR_AREA,
        payload: resultado.data,
      });
      resetMensaje();
    } catch (error) {
      dispatch({
        type: AREA_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };

  const seleccionarArea = (id_area) => {
    dispatch({
      type: AREA_ACTUAL,
      payload: id_area,
    });
  };
  const limpiarArea = () => {
    dispatch({
      type: LIMPIAR_AREA,
    });
  };
  // Eliminar area
  const eliminarArea = async (id_area) => {
    try {
      await clienteAxios.put(`/api/areas/down/${id_area}`);
      dispatch({
        type: BAJA_AREA,
        payload: id_area,
      });
      resetMensaje();
    } catch (error) {
      dispatch({
        type: AREA_ERROR,
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
  const resetMensajeNow = async () => {
    dispatch({
      type: RESET_MESSAGE,
    });
  };
  return (
    <areaContext.Provider
      value={{
        areas: state.areas,
        area: state.area,
        mensaje: state.mensaje,
        registrarArea,
        obtenerAreas,
        actualizarArea,
        eliminarArea,
        seleccionarArea,
        limpiarArea,
        resetMensaje,
        resetMensajeNow,
      }}
    >
      {props.children}
    </areaContext.Provider>
  );
};
export default areaState;
