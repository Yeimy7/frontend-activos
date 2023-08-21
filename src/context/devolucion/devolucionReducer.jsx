import {
  OBTENER_DEVOLUCIONES,
  REGISTRAR_DEVOLUCION,
  DEVOLUCION_ACTUAL,
  DEVOLUCION_ERROR,
  LIMPIAR_DEVOLUCION,
  RESET_MESSAGE,
} from '../../types';
export const devolucionReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_DEVOLUCIONES:
      return {
        ...state,
        devoluciones: action.payload,
      };
    case REGISTRAR_DEVOLUCION:
      const alerta = {
        msg: 'Devolución registrada exitosamente',
        type: 'success',
      };
      return {
        ...state,
        devoluciones: [...state.devoluciones, action.payload],
        mensaje_devolucion: alerta,
      };
    case DEVOLUCION_ACTUAL:
      return {
        ...state,
        devolucion: state.devoluciones.filter(
          (devolucion) => devolucion.id_devolucion === action.payload
        ),
        mensaje_devolucion: null,
      };

    case DEVOLUCION_ERROR:
      return {
        ...state,
        mensaje_devolucion: action.payload,
      };
    case LIMPIAR_DEVOLUCION:
      return {
        ...state,
        devolucion: null,
        mensaje_devolucion: null,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        mensaje_devolucion: null,
      };
    default:
      return state;
  }
};
