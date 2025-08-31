import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useAuth } from './hooks/useAuth';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AdminPage } from './pages/AdminPage';
import { ProductCategory } from './types/Product';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={<HomePage selectedCategory={selectedCategory} />} 
          />
          <Route 
            path="/product/:id" 
            element={<ProductDetailPage />} 
          />
          <Route 
            path="/admin" 
            element={<AdminPage />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;