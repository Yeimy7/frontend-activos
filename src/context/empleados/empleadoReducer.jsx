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
export const empleadoReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_EMPLEADOS:
      return {
        ...state,
        empleados: action.payload,
      };
    case OBTENER_TOTAL_EMPLEADOS:
      return {
        ...state,
        totalEmpleados: action.payload,
      };
    case AGREGAR_EMPLEADO:
      const alerta = {
        msg: 'Empleado registrado exitosamente',
        type: 'success',
      };
      return {
        ...state,
        empleados: [...state.empleados, action.payload],
        mensaje_empleado: alerta,
      };
    case ACTUALIZAR_EMPLEADO:
      return {
        ...state,
        empleados: state.empleados.map((empleado) => {
          if (empleado.id_persona === action.payload.id_persona) {
            const updEmpleado = {
              id_persona: empleado.id_persona,
              nombres: empleado.nombres,
              apellidos: empleado.apellidos,
              ci: empleado.ci,
              fecha_incorporacion: action.payload.fecha_incorporacion,
              'cargo.descripcion_cargo':
                action.payload['cargo.descripcion_cargo'],
              'cargo.area.nombre_area':
                action.payload['cargo.area.nombre_area'],
            };
            return updEmpleado;
          }
          return empleado;
        }),
        empleado: null,
        mensaje_empleado: {msg:'Empleado editado exitosamente', type:'success'},
      };
    case EMPLEADO_ACTUAL:
      return {
        ...state,
        empleado: state.empleados.filter(
          (empleado) => empleado.id_persona === action.payload
        ),
        mensaje_empleado: null,
      };
    case BAJA_EMPLEADO:
      return {
        ...state,
        empleados: state.empleados.filter(
          (empleado) => empleado.id_persona !== action.payload
        ),
        mensaje_empleado: {msg:'Empleado eliminado exitosamente', type:'success'},
      };
    case EMPLEADO_ERROR:
      return {
        ...state,
        mensaje_empleado: action.payload,
      };
    case LIMPIAR_EMPLEADO:
      return {
        ...state,
        empleado: null,
        mensaje_empleado: null,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        mensaje_empleado: null,
      };
    default:
      return state;
  }
};
