import { Routes, Route, BrowserRouter, Navigate, useLocation } from 'react-router-dom'
import { Toast } from './components/Toast';

import React, { useContext, useState } from 'react';

import { NotFoundPage } from './pages/NotFoundPage';
import { IndexPage } from './pages/IndexPage';
import { HomePage } from './pages/HomePage';
import { ConfiguracionPage } from './pages/ConfiguracionPage';
import { AmigosPage } from './pages/AmigosPage';
import { PerfilPage } from './pages/PerfilPage';
import { ChatPage } from './pages/ChatPage';
import { RegisterPage } from './pages/RegisterPage';
import { RecuperarPasswordPage } from './pages/RecuperarPasswordPage';
import { PrivateRoute, PublicRoute } from './helpers/PrivateRoutes';


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<IndexPage />} />
          <Route path="/recuperar" element={<RecuperarPasswordPage />} />
        </Route>

        <Route path="/home" element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />}>
            <Route path="configuracion" element={<ConfiguracionPage />} />
            <Route path="amigos" element={<AmigosPage />} />
            <Route path="perfil" element={<PerfilPage />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toast />
    </div>
  );
}

export default App
