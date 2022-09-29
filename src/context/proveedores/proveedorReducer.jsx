import {
  AGREGAR_PROVEEDOR,
  BAJA_PROVEEDOR,
  OBTENER_PROVEEDORES,
  PROVEEDOR_ERROR,
  PROVEEDOR_ACTUAL,
  LIMPIAR_PROVEEDOR,
  ACTUALIZAR_PROVEEDOR,
} from '../../types';
export const proveedorReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_PROVEEDORES:
      return {
        ...state,
        proveedores: action.payload,
      };
    case AGREGAR_PROVEEDOR:
      const alerta = {
        msg: 'Proveedor creado exitosamente',
        categoria: 'success',
      };
      return {
        ...state,
        proveedores: [...state.proveedores, action.payload],
        mensaje: alerta,
      };
    case ACTUALIZAR_PROVEEDOR:
      return {
        ...state,
        proveedores: state.proveedores.map((proveedor) =>
          proveedor.id_proveedor === action.payload.id_proveedor
            ? action.payload
            : proveedor
        ),
        proveedor: null,
        mensaje: null,
      };
    case PROVEEDOR_ACTUAL:
      return {
        ...state,
        proveedor: state.proveedores.filter(
          (proveedor) => proveedor.id_proveedor === action.payload
        ),
        mensaje: null,
      };
    case BAJA_PROVEEDOR:
      return {
        ...state,
        proveedores: state.proveedores.filter(
          (proveedor) => proveedor.id_proveedor !== action.payload
        ),
      };
    case PROVEEDOR_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_PROVEEDOR:
      return {
        ...state,
        proveedor: null,
      };
      mensaje: null;
    default:
      return state;
  }
};
