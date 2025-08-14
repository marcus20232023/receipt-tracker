import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Page imports
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ReceiptsPage from './pages/receipts/ReceiptsPage';
import ProductsPage from './pages/products/ProductsPage';
import SettingsPage from './pages/settings/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/receipts" element={<ReceiptsPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </Container>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
