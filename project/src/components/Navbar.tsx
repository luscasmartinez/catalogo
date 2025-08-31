import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Settings, LogOut } from 'lucide-react';
import { ProductCategory, categoryLabels } from '../types/Product';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  onCategorySelect: (category: ProductCategory | null) => void;
  selectedCategory: ProductCategory | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onCategorySelect, selectedCategory }) => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const isAdmin = location.pathname.includes('/admin');

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
            <Leaf className="h-8 w-8" />
            <span className="text-xl font-bold">AgroCatalog</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onCategorySelect(null)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                !selectedCategory 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Todos
            </button>
            
            {Object.entries(categoryLabels).map(([category, label]) => (
              <button
                key={category}
                onClick={() => onCategorySelect(category as ProductCategory)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:block">Admin</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  title="Sair"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">Sair</span>
                </button>
              </>
            ) : (
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:block">Admin</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategorySelect(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                !selectedCategory 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Todos
            </button>
            
            {Object.entries(categoryLabels).map(([category, label]) => (
              <button
                key={category}
                onClick={() => onCategorySelect(category as ProductCategory)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};