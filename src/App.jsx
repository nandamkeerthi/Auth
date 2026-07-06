import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Authentication/Login/Login';
import Register from './pages/Authentication/Register/Register';
import ForgotPassword from './pages/Authentication/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword/ResetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
