export const calculoDepreciacionActivo = (data) => {
  const { precio, coeficiente, vida_util, fecha } = data
  const depAnual = (precio - (coeficiente / 100)) / vida_util
  const depMensual = depAnual / 12
  const depDiaria = depAnual / 360
  const today = new Date()
  const back = new Date(fecha)
  const diff = Number(((today - back) / 86400000).toFixed(2))

  return ((precio - (diff * depDiaria)).toFixed(2))
}

export const CalculoDepreciacionActivoMes = (data) => {
  const { precio, coeficiente, vida_util, fecha_ingreso, mes, anio } = data
  const depAnual = (precio - (coeficiente / 100)) / vida_util
  const depDiaria = depAnual / 360
  const today = new Date(`30-${mes}-${anio}`)
  const back = new Date(fecha_ingreso)
  const diff = Number(((today - back) / 86400000).toFixed(2))

  return ((precio - (diff * depDiaria)).toFixed(2))
}