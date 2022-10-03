import {
  AGREGAR_EMPLEADO,
  BAJA_EMPLEADO,
  OBTENER_EMPLEADOS,
  EMPLEADO_ERROR,
  EMPLEADO_ACTUAL,
  LIMPIAR_EMPLEADO,
  ACTUALIZAR_EMPLEADO,
} from '../../types';
export const empleadoReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_EMPLEADOS:
      return {
        ...state,
        empleados: action.payload,
      };
    case AGREGAR_EMPLEADO:
      // const alerta = {
      //   msg: 'Área creada exitosamente',
      //   categoria: 'success',
      // };
      return {
        ...state,
        empleados: [...state.empleados, action.payload],
        // mensaje: alerta,
      };
    case ACTUALIZAR_EMPLEADO:
      console.log(action.payload['cargo.descripcion_cargo'])
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
              'cargo.descripcion_cargo': action.payload['cargo.descripcion_cargo'],
              'cargo.area.nombre_area': action.payload['cargo.area.nombre_area'],
            };
            return updEmpleado;
          }
          return empleado;
        }),
        empleado: null,
        mensaje: null,
      };
    case EMPLEADO_ACTUAL:
      return {
        ...state,
        empleado: state.empleados.filter(
          (empleado) => empleado.id_persona === action.payload
        ),
        mensaje: null,
      };
    case BAJA_EMPLEADO:
      return {
        ...state,
        empleados: state.empleados.filter(
          (empleado) => empleado.id_persona !== action.payload
        ),
      };
    case EMPLEADO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_EMPLEADO:
      return {
        ...state,
        empleado: null,
        mensaje: null,
      };
    default:
      return state;
  }
};
