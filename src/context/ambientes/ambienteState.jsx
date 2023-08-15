import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import ambienteContext from './ambienteContext';
import { ambienteReducer } from './ambienteReducer';
import {
  AGREGAR_AMBIENTE,
  BAJA_AMBIENTE,
  OBTENER_AMBIENTES,
  AMBIENTE_ERROR,
  AMBIENTE_ACTUAL,
  LIMPIAR_AMBIENTE,
  ACTUALIZAR_AMBIENTE,
  FORMULARIO_AMBIENTE,
  OBTENER_TODOS_AMBIENTES,
} from '../../types';

const ambienteState = (props) => {
  const initialState = {
    ambientes: [],
    todosAmbientes:[],
    ambienteSeleccionado: null,
    formulario: false,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(ambienteReducer, initialState);
  // Registrar ambiente
  const registrarAmbiente = async (ambiente) => {
    try {
      const resultado = await clienteAxios.post('/api/ambientes', ambiente);
      dispatch({
        type: AGREGAR_AMBIENTE,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: AMBIENTE_ERROR,
        payload: alerta,
      });
    }
  };
  // Obtener ambientes
  const obtenerAmbientes = async (piso) => {
    try {
      const resultado = await clienteAxios.get(
        `/api/ambientes/por_piso/${piso.id_piso}`
      );
      dispatch({
        type: OBTENER_AMBIENTES,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: AMBIENTE_ERROR,
        payload: alerta,
      });
    }
  };

  //Obtener todos los ambientes

  const obtenerTodosAmbientes = async () => {
    try {
      const resultado = await clienteAxios.get(
        `/api/ambientes/`
      );
      dispatch({
        type: OBTENER_TODOS_AMBIENTES,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: AMBIENTE_ERROR,
        payload: alerta,
      });
    }
  };
  // Actualizar ambiente
  const actualizarAmbiente = async (ambiente) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/ambientes/${ambiente.id_ambiente}`,
        ambiente
      );
      dispatch({
        type: ACTUALIZAR_AMBIENTE,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: AMBIENTE_ERROR,
        payload: alerta,
      });
    }
  };

  const seleccionarAmbiente = (id_ambiente) => {
    dispatch({
      type: AMBIENTE_ACTUAL,
      payload: id_ambiente,
    });
  };
  
  const mostrarFormulario = () => {
    dispatch({
        type: FORMULARIO_AMBIENTE
    })
}
  const limpiarAmbiente = () => {
    dispatch({
      type: LIMPIAR_AMBIENTE,
    });
  };
  // Eliminar ambiente
  const eliminarAmbiente = async (id_ambiente) => {
    try {
      await clienteAxios.put(`/api/ambientes/baja/${id_ambiente}`);
      dispatch({
        type: BAJA_AMBIENTE,
        payload: id_ambiente,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: AMBIENTE_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <ambienteContext.Provider
      value={{
        ambientes: state.ambientes,
        todosAmbientes:state.todosAmbientes,
        ambienteSeleccionado: state.ambienteSeleccionado,
        formulario: state.formulario,
        mensaje: state.mensaje,
        registrarAmbiente,
        obtenerAmbientes,
        obtenerTodosAmbientes,
        actualizarAmbiente,
        eliminarAmbiente,
        seleccionarAmbiente,
        mostrarFormulario,
        limpiarAmbiente,
      }}
    >
      {props.children}
    </ambienteContext.Provider>
  );
};
export default ambienteState;
