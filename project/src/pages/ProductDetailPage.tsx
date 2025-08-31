import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product, categoryLabels } from '../types/Product';
import { ArrowLeft, MapPin, Package, Calendar, Leaf, Loader2 } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate() || new Date(),
            updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
          } as Product);
        } else {
          setError('Produto não encontrado');
        }
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
        setError('Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-600 mb-4">{error}</p>
          <Link to="/" className="text-green-600 hover:text-green-700 underline">
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar ao catálogo</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-2">
            {/* Product Image */}
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {categoryLabels[product.category]}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {product.subcategory}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{product.origin}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Package className="h-5 w-5 mr-2" />
                  <span>{product.unit}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{product.harvest}</span>
                </div>
              </div>

              <div className="mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? '✓ Disponível' : '✗ Indisponível'}
                </span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {product.nutritionalInfo && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Leaf className="h-5 w-5 mr-2 text-green-600" />
                    Informações Nutricionais
                  </h3>
                  <p className="text-gray-700 bg-green-50 p-4 rounded-lg">
                    {product.nutritionalInfo}
                  </p>
                </div>
              )}

              <div className="border-t pt-6">
                <div className="text-right">
                  <span className="text-4xl font-bold text-green-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <div className="text-gray-500">por {product.unit}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};