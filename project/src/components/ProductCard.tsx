import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Package } from 'lucide-react';
import { Product, categoryLabels } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-12">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            {categoryLabels[product.category]}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            product.inStock 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'Disponível' : 'Indisponível'}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{product.origin}</span>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm">
              <Package className="h-4 w-4 mr-1" />
              <span>{product.unit}</span>
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-2xl font-bold text-green-600">
              R$ {product.price.toFixed(2)}
            </span>
            <div className="text-xs text-gray-500">por {product.unit}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};