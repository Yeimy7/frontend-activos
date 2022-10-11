import {
  OBTENER_TRASLADOS,
  REGISTRAR_TRASLADO,
  TRASLADO_ACTUAL,
  TRASLADO_ERROR,
  LIMPIAR_TRASLADO,
} from '../../types';
export const trasladoReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_TRASLADOS:
      return {
        ...state,
        traslados: action.payload,
      };
    case REGISTRAR_TRASLADO:
      // const alerta = {
      //   msg: 'Área creada exitosamente',
      //   categoria: 'success',
      // };
      return {
        ...state,
        traslados: [...state.traslados, action.payload],
        // mensaje: alerta,
      };
    case TRASLADO_ACTUAL:
      return {
        ...state,
        traslado: state.traslados.filter(
          (traslado) => traslado.id_traslado === action.payload
        ),
        mensaje: null,
      };

    case TRASLADO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_TRASLADO:
      return {
        ...state,
        traslado: null,
        mensaje: null,
      };
    default:
      return state;
  }
};
