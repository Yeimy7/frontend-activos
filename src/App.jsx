// import "./App.css";
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import tokenAuth from './config/token';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autentication/authState';
import SidebarState from './context/sidebar/sidebarState';
import UserState from './context/users/userState';
import ProveedorState from './context/proveedores/proveedorState';
import AreaState from './context/areas/areaState';
import CargoState from './context/cargos/cargoState';
import EmpleadoState from './context/empleados/empleadoState';
import ActivoState from './context/activos/activoState';
import DevolucionState from './context/devolucion/devolucionState';
import BajaState from './context/bajas/bajaState';
import TrasladoState from './context/traslados/trasladoState';
import DepreciacionState from './context/depreciacion/depreciacionState';
import ListaState from './context/listas/listaState';
import EdificioState from './context/edificios/edificioState';
import PisoState from './context/pisos/pisoState';
import AmbienteState from './context/ambientes/ambienteState';
import { MainRouter } from './routers/routing/MainRouter';
//Revisar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <AlertaState>
      <AuthState>
        <SidebarState>
          <UserState>
            <AreaState>
              <CargoState>
                <ListaState>
                  <ProveedorState>
                    <EmpleadoState>
                      <ActivoState>
                        <DevolucionState>
                          <BajaState>
                            <TrasladoState>
                              <DepreciacionState>
                                <EdificioState>
                                  <PisoState>
                                    <AmbienteState>
                                      <MainRouter />
                                    </AmbienteState>
                                  </PisoState>
                                </EdificioState>
                              </DepreciacionState>
                            </TrasladoState>
                          </BajaState>
                        </DevolucionState>
                      </ActivoState>
                    </EmpleadoState>
                  </ProveedorState>
                </ListaState>
              </CargoState>
            </AreaState>
          </UserState>
        </SidebarState>
      </AuthState>
    </AlertaState>
  );
}

export default App;
