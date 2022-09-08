// import "./App.css";
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import SidebarState from './context/sidebar/sidebarState';
import { MainRouter } from "./routers/routing/MainRouter";

function App() {
  return (
    <SidebarState>
      <MainRouter />
    </SidebarState>
  );
}

export default App;
