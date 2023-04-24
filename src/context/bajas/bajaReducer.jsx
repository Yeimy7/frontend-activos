import {
  OBTENER_BAJAS,
  REGISTRAR_BAJA,
  BAJA_ACTUAL,
  BAJA_ERROR,
  LIMPIAR_BAJA,
  OBTENER_TOTAL_BAJAS,
} from '../../types';
export const bajaReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_BAJAS:
      return {
        ...state,
        bajas: action.payload,
      };
    case OBTENER_TOTAL_BAJAS:
      return {
        ...state,
        totalBajas: action.payload,
      };
    case REGISTRAR_BAJA:
      // const alerta = {
      //   msg: 'Área creada exitosamente',
      //   categoria: 'success',
      // };
      return {
        ...state,
        bajas: [...state.bajas, action.payload],
        // mensaje: alerta,
      };
    case BAJA_ACTUAL:
      return {
        ...state,
        baja: state.bajas.filter((baja) => baja.id_baja === action.payload),
        mensaje_baja: null,
      };

    case BAJA_ERROR:
      return {
        ...state,
        mensaje_baja: action.payload,
      };
    case LIMPIAR_BAJA:
      return {
        ...state,
        baja: null,
        mensaje_baja: null,
      };
    default:
      return state;
  }
};
