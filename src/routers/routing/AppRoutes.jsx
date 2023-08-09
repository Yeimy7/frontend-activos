import React from 'react';
import { Route } from 'react-router-dom';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { privateRoutes } from '../routes';
import { Navbar } from '../../components/ui/Navbar';
import { PageContainer } from '../../components/ui/PageContainer';
import { Sidebar } from '../../components/ui/Sidebar';
import { Configurations } from '../../pages/Configurations';
import { HomeApp } from '../../pages/HomeApp';
import { PersonalData } from '../../pages/PersonalData';
import { UserManagment } from '../../pages/UserManagment';
import { ProviderManagment } from '../../pages/ProviderManagment';
import { AdmArea } from '../../pages/AdmArea';
import { AdmCargo } from '../../pages/AdmCargo';
import { AdmEmpleado } from '../../pages/AdmEmpleado';
import { AdmActivo } from '../../pages/AdmActivos';
import { ListarActivos } from '../../pages/ListarActivos';
import { AdmAsignacion } from '../../pages/AdmAsignacion';
import { AdmDevolucion } from '../../pages/AdmDevolucion';
import { AdmHistorialDevolucion } from '../../pages/AdmHistorialDevolucion';
import { AdmHistorialBaja } from '../../pages/AdmHistorialBaja';
import { AdmHistorialTraslado } from '../../pages/AdmHistorialTraslado';
import { AdmDepreciacion } from '../../pages/AdmDepreciacion';
import { EscanerCodigoBarra } from '../../pages/EscanerCodigoBarra';
import { AdmDepreciar } from '../../pages/AdmDepreciar';
import { AdmEstructura } from '../../pages/AdmEstructura';
import { AdmCodigo } from '../../pages/AdmCodigos';

export const AppRoutes = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <PageContainer>
        <NotFoundComponent>
          <Route path={privateRoutes.APP_HOME} element={<HomeApp />} />
          <Route
            path={privateRoutes.PERSONAL_DATA}
            element={<PersonalData />}
          />
          <Route
            path={privateRoutes.USER_MANAGMENT}
            element={<UserManagment />}
          />
          <Route
            path={privateRoutes.PROVIDER_MANAGMENT}
            element={<ProviderManagment />}
          />
          <Route path={privateRoutes.ADM_AREA} element={<AdmArea />} />
          <Route path={privateRoutes.ADM_CARGO} element={<AdmCargo />} />
          <Route path={privateRoutes.ADM_EMPLEADO} element={<AdmEmpleado />} />
          <Route path={privateRoutes.ADM_ACTIVO} element={<AdmActivo />} />
          <Route
            path={privateRoutes.LISTA_ACTIVOS}
            element={<ListarActivos />}
          />
          <Route
            path={privateRoutes.ADM_ASIGNACION}
            element={<AdmAsignacion />}
          />
          <Route
            path={privateRoutes.ADM_DEVOLUCION}
            element={<AdmDevolucion />}
          />
          <Route
            path={privateRoutes.ADM_HISTORIAL_DEVOLUCION}
            element={<AdmHistorialDevolucion />}
          />
          <Route
            path={privateRoutes.ADM_HISTORIAL_BAJA}
            element={<AdmHistorialBaja />}
          />
          <Route
            path={privateRoutes.ADM_HISTORIAL_TRASLADO}
            element={<AdmHistorialTraslado />}
          />
          <Route
            path={privateRoutes.ADM_DEPRECIACION}
            element={<AdmDepreciacion />}
          />
          <Route
            path={privateRoutes.ADM_DEPRECIAR}
            element={<AdmDepreciar />}
          />
          <Route
            path={privateRoutes.ADM_ESTRUCTURA}
            element={<AdmEstructura />}
          />
          <Route path={privateRoutes.ADM_CODIGO} element={<AdmCodigo />} />
          <Route
            path={privateRoutes.ESCANER_CODIGO_BARRA}
            element={<EscanerCodigoBarra />}
          />
          <Route
            path={privateRoutes.CONFIGURATIONS}
            element={<Configurations />}
          />
        </NotFoundComponent>
      </PageContainer>
    </>
  );
};
