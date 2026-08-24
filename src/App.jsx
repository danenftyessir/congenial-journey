import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { AppProvider, useApp } from './context/AppContext';
import { EasterEggProvider } from './context/EasterEggContext';
import EasterEggModal from './components/EasterEggModal';
import ProfileSelect from './pages/ProfileSelect';
import Home from './pages/Home';
import MemoryDetail from './pages/MemoryDetail';
import MyMemoriesPage from './pages/MyMemoriesPage';

function AosRefresher() {
  const location = useLocation();
  useEffect(() => {
    Aos.init({ once: true });
    setTimeout(() => Aos.refresh(), 100);
  }, [location.pathname]);
  return null;
}

function AppRoutes() {
  const { currentProfile } = useApp();

  return (
    <Routes>
      <Route path="/profile" element={<ProfileSelect />} />
      <Route
        path="/home"
        element={currentProfile ? <Home /> : <Navigate to="/profile" replace />}
      />
      <Route
        path="/memory/:id"
        element={currentProfile ? <MemoryDetail /> : <Navigate to="/profile" replace />}
      />
      <Route
        path="/my-memories"
        element={currentProfile ? <MyMemoriesPage /> : <Navigate to="/profile" replace />}
      />
      <Route
        path="*"
        element={<Navigate to={currentProfile ? '/home' : '/profile'} replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <EasterEggProvider>
        <BrowserRouter>
          <AosRefresher />
          <AppRoutes />
          <EasterEggModal />
        </BrowserRouter>
      </EasterEggProvider>
    </AppProvider>
  );
}

export default App;
