import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import cargoContext from './cargoContext';
import { cargoReducer } from './cargoReducer';
import {
  AGREGAR_CARGO,
  BAJA_CARGO,
  OBTENER_CARGOS,
  CARGO_ERROR,
  CARGO_ACTUAL,
  LIMPIAR_CARGO,
  ACTUALIZAR_CARGO,
} from '../../types';

const cargoState = (props) => {
  const initialState = {
    cargos: [],
    cargo: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(cargoReducer, initialState);
  // Registrar cargo
  const registrarCargo = async (cargo) => {
    try {
      const resultado = await clienteAxios.post('/api/cargos', cargo);
      dispatch({
        type: AGREGAR_CARGO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: CARGO_ERROR,
        payload: alerta,
      });
    }
  };
  // Obtener cargos
  const obtenerCargos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/cargos');
      dispatch({
        type: OBTENER_CARGOS,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: CARGO_ERROR,
        payload: alerta,
      });
    }
  };
  // Actualizar cargo
  const actualizarCargo = async (cargo) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/cargos/${cargo.id_cargo}`,
        cargo
      );
      dispatch({
        type: ACTUALIZAR_CARGO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: CARGO_ERROR,
        payload: alerta,
      });
    }
  };

  const seleccionarCargo = (id_cargo) => {
    dispatch({
      type: CARGO_ACTUAL,
      payload: id_cargo,
    });
  };
  const limpiarCargo = () => {
    dispatch({
      type: LIMPIAR_CARGO,
    });
  };
  // Eliminar cargo
  const eliminarCargo = async (id_cargo) => {
    try {
      await clienteAxios.put(`/api/cargos/down/${id_cargo}`);
      dispatch({
        type: BAJA_CARGO,
        payload: id_cargo,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: CARGO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <cargoContext.Provider
      value={{
        cargos: state.cargos,
        cargo: state.cargo,
        mensaje: state.mensaje,
        registrarCargo,
        obtenerCargos,
        actualizarCargo,
        eliminarCargo,
        seleccionarCargo,
        limpiarCargo,
      }}
    >
      {props.children}
    </cargoContext.Provider>
  );
};
export default cargoState;
