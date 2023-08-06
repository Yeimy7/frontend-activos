import {
  AGREGAR_AMBIENTE,
  BAJA_AMBIENTE,
  OBTENER_AMBIENTES,
  AMBIENTE_ERROR,
  AMBIENTE_ACTUAL,
  LIMPIAR_AMBIENTE,
  ACTUALIZAR_AMBIENTE,
  FORMULARIO_AMBIENTE,
} from '../../types';
export const ambienteReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_AMBIENTES:
      return {
        ...state,
        ambientes: action.payload,
      };
    case AGREGAR_AMBIENTE:
      const alerta = {
        msg: 'Ambiente creado exitosamente',
        categoria: 'success',
      };
      return {
        ...state,
        ambientes: [action.payload, ...state.ambientes],
        mensaje: alerta,
        formulario:false
      };
    case ACTUALIZAR_AMBIENTE:
      return {
        ...state,
        ambientes: state.ambientes.map((ambiente) =>
          ambiente.id_ambiente === action.payload.id_ambiente ? action.payload : ambiente
        ),
        ambienteSeleccionado: null,
        mensaje: null,
      };
    case AMBIENTE_ACTUAL:
      return {
        ...state,
        ambienteSeleccionado: state.ambientes.filter(
          (ambiente) => ambiente.id_ambiente === action.payload
        ),
        mensaje: null,
      };
    case BAJA_AMBIENTE:
      return {
        ...state,
        ambientes: state.ambientes.filter((ambiente) => ambiente.id_ambiente !== action.payload),
      };
    case AMBIENTE_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_AMBIENTE:
      return {
        ...state,
        ambienteSeleccionado: null,
        mensaje: null,
        formulario:false
      };
    case FORMULARIO_AMBIENTE:
      return {
        ...state,
        formulario: true,
      };
    default:
      return state;
  }
};
