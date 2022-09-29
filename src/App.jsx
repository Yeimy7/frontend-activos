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
              <ProveedorState>
                <MainRouter />
              </ProveedorState>
            </AreaState>
          </UserState>
        </SidebarState>
      </AuthState>
    </AlertaState>
  );
}

export default App;
