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
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: AREA_ERROR,
        payload: alerta,
      });
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
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: AREA_ERROR,
        payload: alerta,
      });
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
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: AREA_ERROR,
        payload: alerta,
      });
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
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: AREA_ERROR,
        payload: alerta,
      });
    }
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
      }}
    >
      {props.children}
    </areaContext.Provider>
  );
};
export default areaState;
