import React from 'react';
import { Route } from 'react-router-dom';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { Navbar } from '../../components/ui/Navbar';
import { PageContainer } from '../../components/ui/PageContainer';
import { Sidebar } from '../../components/ui/Sidebar';
import { Configurations } from '../../pages/Configurations';
import { HomeApp } from '../../pages/HomeApp';
import { PersonalData } from '../../pages/PersonalData';
import { UserManagment } from '../../pages/UserManagment';
import { ProviderManagment } from '../../pages/ProviderManagment';
import { privateRoutes } from '../routes';

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
          <Route
            path={privateRoutes.CONFIGURATIONS}
            element={<Configurations />}
          />
        </NotFoundComponent>
      </PageContainer>
    </>
  );
};
