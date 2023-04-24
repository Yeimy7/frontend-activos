import clienteAxios from './axios'

const tokenAuth = (token, name ) => {
  if (token) {
    clienteAxios.defaults.headers.common[name] = token
  }
  else {
    delete clienteAxios.defaults.headers.common[name]
  }
}
export default tokenAuth


