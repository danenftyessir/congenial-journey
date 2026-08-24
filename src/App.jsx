import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import ProfileSelect from './pages/ProfileSelect';
import Home from './pages/Home';
import MemoryDetail from './pages/MemoryDetail';
import MyMemoriesPage from './pages/MyMemoriesPage';
import TimelinePage from './pages/TimelinePage';
import StatsPage from './pages/StatsPage';

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
        path="/timeline"
        element={currentProfile ? <TimelinePage /> : <Navigate to="/profile" replace />}
      />
      <Route
        path="/stats"
        element={currentProfile ? <StatsPage /> : <Navigate to="/profile" replace />}
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
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
