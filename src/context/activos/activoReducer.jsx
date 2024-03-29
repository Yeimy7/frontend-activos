import {
  AGREGAR_ACTIVO,
  BAJA_ACTIVO,
  OBTENER_ACTIVOS,
  ACTIVO_ERROR,
  ACTIVO_ACTUAL,
  LIMPIAR_ACTIVO,
  ACTUALIZAR_ACTIVO,
  ACTUALIZAR_IMAGEN_ACTIVO,
  ACTIVO_OBTENER_AUXILIARES,
  ACTIVO_OBTENER_GRUPOS,
  EDITAR_IMAGEN_ACTIVO,
  OBTENER_ACTIVOS_ASIGNADOS,
  OBTENER_ACTIVOS_NO_ASIGNADOS,
  ASIGNAR_ACTIVO,
  DESVINCULAR_ACTIVO,
  ACTIVO_A_DEVOLVER,
  LIMPIAR_ACTIVO_A_DEVOLVER,
  ACTIVO_BAJA,
  LIMPIAR_ACTIVO_BAJA,
  ACTIVO_A_TRASLADAR,
  LIMPIAR_ACTIVO_A_TRASLADAR,
  TRASLADO_ACTIVO,
  OBTENER_TOTAL_ACTIVOS,
  OBTENER_TOTAL_ASIGNADOS,
  ACTIVO_OBTENER_TOTAL_GRUPOS,
  AGREGAR_CODIGO_ACTIVOS,
  ELIMINAR_CODIGO_ACTIVO,
  LIMPIAR_CODIGO_ACTIVOS,
  RESET_MESSAGE,
} from '../../types';
export const activoReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_ACTIVOS:
      return {
        ...state,
        activos: action.payload,
      };
    case OBTENER_TOTAL_ACTIVOS:
      return {
        ...state,
        totalActivos: action.payload,
      };
    case OBTENER_TOTAL_ASIGNADOS:
      return {
        ...state,
        totalActivosAsignados: action.payload,
      };
    case OBTENER_ACTIVOS_ASIGNADOS:
      return {
        ...state,
        activosAsignados: action.payload,
      };
    case OBTENER_ACTIVOS_NO_ASIGNADOS:
      return {
        ...state,
        activosNoAsignados: action.payload,
      };
    case ACTIVO_OBTENER_AUXILIARES:
      return {
        ...state,
        auxiliares: action.payload,
      };
    case ACTIVO_OBTENER_GRUPOS:
      return {
        ...state,
        grupos: action.payload,
      };
    case ACTIVO_OBTENER_TOTAL_GRUPOS:
      return {
        ...state,
        totalGrupos: action.payload,
      };
    case AGREGAR_ACTIVO:
      const alertaCreado = {
        msg: 'Activo creado exitosamente',
        type: 'success',
      };
      return {
        ...state,
        activos: [action.payload, ...state.activos],
        mensaje: alertaCreado,
      };
    case ACTUALIZAR_ACTIVO:
      const alerta = {
        msg: 'Activo actualizado exitosamente',
        categoria: 'success',
      };
      return {
        ...state,
        activos: state.activos.map((activo) => {
          if (activo.id_activo === action.payload.id_activo) {
            const updActivo = {
              id_activo: activo.id_activo,
              codigo_activo: action.payload.codigo_activo,
              fecha_ingreso: action.payload.fecha_ingreso,
              descripcion_activo: action.payload.descripcion_activo,
              img_activo: activo.img_activo,
              estado: activo.estado,
              'ambiente.codigo_ambiente': activo['ambiente.codigo_ambiente'],
              'ambiente.tipo_ambiente': activo['ambiente.tipo_ambiente'],
              'auxiliar.descripcion_aux': activo['auxiliar.descripcion_aux'],
              'grupo_contable.descripcion_g':
                activo['grupo_contable.descripcion_g'],
              'proveedor.razon_social': activo['proveedor.razon_social'],
            };
            return updActivo;
          }
          return activo;
        }),
        mensaje: alerta,
        activo: null,
      };
    case ACTUALIZAR_IMAGEN_ACTIVO:
      return {
        ...state,
        activos: state.activos.map((activo) => {
          if (activo.id_activo === action.payload.id_activo) {
            const updActivo = {
              ...activo,
              img_activo: action.payload.img_activo,
            };
            return updActivo;
          }
          return activo;
        }),
        activo: null,
        imagenActivo: false,
        mensaje: { msg: 'Imagen actualizada exitosamente', type: 'success' },
      };
    case EDITAR_IMAGEN_ACTIVO:
      return {
        ...state,
        activo: state.activos.filter(
          (activo) => activo.id_activo === action.payload
        ),
        imagenActivo: true,
        mensaje: null,
      };
    case ACTIVO_ACTUAL:
      return {
        ...state,
        activo: state.activos.filter(
          (activo) => activo.id_activo === action.payload
        ),
        mensaje: null,
      };
    case ACTIVO_A_DEVOLVER:
      return {
        ...state,
        activoADevolver: state.activosAsignados.filter(
          (activo) => activo.id_activo === action.payload
        ),
        mensaje: null,
      };
    case ACTIVO_BAJA:
      return {
        ...state,
        activoBaja: state.activos.filter(
          (activo) => activo.id_activo === action.payload
        ),
        mensaje: null,
      };
    case ACTIVO_A_TRASLADAR:
      return {
        ...state,
        activoTraslado: state.activos.filter(
          (activo) => activo.id_activo === action.payload
        ),
        mensaje: null,
      };
    case BAJA_ACTIVO:
      const alertaBaja = {
        msg: 'Activo dado de baja exitosamente',
        type: 'success',
      };
      return {
        ...state,
        activos: state.activos.filter(
          (activo) => activo.id_activo !== action.payload
        ),
        mensaje: alertaBaja,
      };
    case ACTIVO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_ACTIVO:
      return {
        ...state,
        activo: null,
        imagenActivo: false,
        mensaje: null,
      };
    case LIMPIAR_ACTIVO_A_DEVOLVER:
      return {
        ...state,
        activoADevolver: null,
        mensaje: null,
      };
    case LIMPIAR_ACTIVO_BAJA:
      return {
        ...state,
        activoBaja: null,
        mensaje: null,
      };
    case LIMPIAR_ACTIVO_A_TRASLADAR:
      return {
        ...state,
        activoTraslado: null,
        mensaje: null,
      };
    case ASIGNAR_ACTIVO:
      return {
        ...state,
        activosAsignados: [action.payload, ...state.activosAsignados],
        activosNoAsignados: state.activosNoAsignados.filter(
          (activo) => activo.id_activo !== action.payload.id_activo
        ),
        mensaje:{msg:'Asignación realizada exitosamente', type: 'success'}
      };
    case DESVINCULAR_ACTIVO:
      return {
        ...state,
        activosNoAsignados: [action.payload, ...state.activosNoAsignados],
        activosAsignados: state.activosAsignados.filter(
          (activo) => activo.id_activo !== action.payload.id_activo
        ),
        mensaje:{msg:'Desvinculación realizada exitosamente', type: 'success'}
      };
    case TRASLADO_ACTIVO:
      return {
        ...state,
        activos: state.activos.map((activo) => {
          if (activo.id_activo === action.payload.id_activo) {
            const updActivo = {
              ...activo,
              fecha_asig_ambiente: action.payload.fecha_asig_ambiente,
              'ambiente.codigo_ambiente': action.payload.codigo_ambiente,
              'ambiente.tipo_ambiente': action.payload.tipo_ambiente,
            };
            return updActivo;
          }
          return activo;
        }),
        activoTraslado: null,
        mensaje: { msg: 'Activo trasladado exitosamente', type: 'success' },
      };
    case AGREGAR_CODIGO_ACTIVOS:
      return {
        ...state,
        codigoActivos: [...state.codigoActivos, action.payload],
        activos: state.activos.filter(
          (activo) => activo.id_activo !== action.payload.id_activo
        ),
      };
    case ELIMINAR_CODIGO_ACTIVO:
      return {
        ...state,
        codigoActivos: state.codigoActivos.filter(
          (activo) => activo.id_activo !== action.payload.id_activo
        ),
        activos: [action.payload, ...state.activos],
      };
    case LIMPIAR_CODIGO_ACTIVOS:
      return {
        ...state,
        codigoActivos: [],
        mensaje: null,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        mensaje: null,
      };
    default:
      return state;
  }
};
