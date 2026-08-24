import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { EasterEggProvider } from './context/EasterEggContext';
import EasterEggModal from './components/EasterEggModal';
import ProfileSelect from './pages/ProfileSelect';
import Home from './pages/Home';
import MemoryDetail from './pages/MemoryDetail';
import MyMemoriesPage from './pages/MyMemoriesPage';

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
          <AppRoutes />
          <EasterEggModal />
        </BrowserRouter>
      </EasterEggProvider>
    </AppProvider>
  );
}

export default App;
