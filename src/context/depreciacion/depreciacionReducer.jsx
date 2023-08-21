import {
  OBTENER_GESTION,
  OBTENER_GESTIONES,
  REALIZAR_DEPRECIACION,
  REGISTRAR_VALOR,
  DEPRECIACION_ERROR,
  LIMPIAR_MENSAJE_DEPRECIACION,
} from '../../types';
export const depreciacionReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_GESTION:
      return {
        ...state,
        gestion: action.payload,
      };
    case OBTENER_GESTIONES:
      return {
        ...state,
        gestiones: action.payload,
      };
    case REALIZAR_DEPRECIACION:
      return {
        ...state,
        mensaje_depreciacion: action.payload,
      };

    case DEPRECIACION_ERROR:
      return {
        ...state,
        mensaje_depreciacion: action.payload,
      };
    case LIMPIAR_MENSAJE_DEPRECIACION:
      return {
        ...state,
        mensaje_depreciacion: null,
      };
    default:
      return state;
  }
};
