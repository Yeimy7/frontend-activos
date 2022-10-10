import {
  OBTENER_DEVOLUCIONES,
  REGISTRAR_DEVOLUCION,
  DEVOLUCION_ACTUAL,
  DEVOLUCION_ERROR,
  LIMPIAR_DEVOLUCION,
} from '../../types';
export const devolucionReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_DEVOLUCIONES:
      return {
        ...state,
        devoluciones: action.payload,
      };
    case REGISTRAR_DEVOLUCION:
      // const alerta = {
      //   msg: 'Área creada exitosamente',
      //   categoria: 'success',
      // };
      return {
        ...state,
        devoluciones: [...state.devoluciones, action.payload],
        // mensaje: alerta,
      };
    case DEVOLUCION_ACTUAL:
      return {
        ...state,
        devolucion: state.devoluciones.filter(
          (devolucion) => devolucion.id_devolucion === action.payload
        ),
        mensaje: null,
      };

    case DEVOLUCION_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_DEVOLUCION:
      return {
        ...state,
        devolucion: null,
        mensaje: null,
      };
    default:
      return state;
  }
};
