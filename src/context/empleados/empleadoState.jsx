import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import empleadoContext from './empleadoContext';
import { empleadoReducer } from './empleadoReducer';
import {
  AGREGAR_EMPLEADO,
  BAJA_EMPLEADO,
  OBTENER_EMPLEADOS,
  EMPLEADO_ERROR,
  EMPLEADO_ACTUAL,
  LIMPIAR_EMPLEADO,
  ACTUALIZAR_EMPLEADO,
  OBTENER_TOTAL_EMPLEADOS,
  RESET_MESSAGE,
} from '../../types';

const empleadoState = (props) => {
  const initialState = {
    empleados: [],
    totalEmpleados: null,
    empleado: null,
    mensaje_empleado: null,
  };

  const [state, dispatch] = useReducer(empleadoReducer, initialState);
  // Registrar empleado
  const registrarEmpleado = async (empleado) => {
    try {
      const resultado = await clienteAxios.post('/api/empleados', empleado);
      dispatch({
        type: AGREGAR_EMPLEADO,
        payload: resultado.data,
      });
      resetMensajeEmpleado();
    } catch (error) {
      dispatch({
        type: EMPLEADO_ERROR,
        payload: error.response.data,
      });
      resetMensajeEmpleado();
    }
  };
  // Obtener empleados
  const obtenerEmpleados = async () => {
    try {
      const resultado = await clienteAxios.get('/api/empleados');
      dispatch({
        type: OBTENER_EMPLEADOS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: EMPLEADO_ERROR,
        payload: error.response.data,
      });
      resetMensajeEmpleado();
    }
  };

  const obtenerTotalEmpleados = async () => {
    try {
      const resultado = await clienteAxios.get('/api/empleados/total');
      dispatch({
        type: OBTENER_TOTAL_EMPLEADOS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: EMPLEADO_ERROR,
        payload: error.response.data,
      });
      resetMensajeEmpleado();
    }
  };
  // Actualizar empleado
  const actualizarEmpleado = async (empleado) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/empleados/${empleado.id_persona}`,
        empleado
      );
      dispatch({
        type: ACTUALIZAR_EMPLEADO,
        payload: resultado.data,
      });
      resetMensajeEmpleado();
    } catch (error) {
      dispatch({
        type: EMPLEADO_ERROR,
        payload: error.response.data,
      });
      resetMensajeEmpleado();
    }
  };

  const seleccionarEmpleado = (id_persona) => {
    dispatch({
      type: EMPLEADO_ACTUAL,
      payload: id_persona,
    });
  };
  const limpiarEmpleado = () => {
    dispatch({
      type: LIMPIAR_EMPLEADO,
    });
  };
  // Eliminar empleado
  const eliminarEmpleado = async (id_persona) => {
    try {
      await clienteAxios.put(`/api/empleados/down/${id_persona}`);
      dispatch({
        type: BAJA_EMPLEADO,
        payload: id_persona,
      });
      resetMensajeEmpleado();
    } catch (error) {
      dispatch({
        type: EMPLEADO_ERROR,
        payload: error.response.data,
      });
    }
  };
  const resetMensajeEmpleado = async () => {
    setTimeout(() => {
      dispatch({
        type: RESET_MESSAGE,
      });
    }, 4000);
  };
  const resetMensajeEmpleadoNow = async () => {
    dispatch({
      type: RESET_MESSAGE,
    });
  };
  return (
    <empleadoContext.Provider
      value={{
        empleados: state.empleados,
        totalEmpleados: state.totalEmpleados,
        empleado: state.empleado,
        mensaje_empleado: state.mensaje_empleado,
        registrarEmpleado,
        obtenerEmpleados,
        obtenerTotalEmpleados,
        actualizarEmpleado,
        eliminarEmpleado,
        seleccionarEmpleado,
        limpiarEmpleado,
        resetMensajeEmpleado,
        resetMensajeEmpleadoNow,
      }}
    >
      {props.children}
    </empleadoContext.Provider>
  );
};
export default empleadoState;
