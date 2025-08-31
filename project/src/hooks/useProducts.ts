import { useState, useEffect } from 'react';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product, ProductCategory } from '../types/Product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (category?: ProductCategory) => {
    setLoading(true);
    setError(null);
    
    try {
      let q = query(collection(db, 'products'), orderBy('name'));
      
      if (category) {
        q = query(collection(db, 'products'), where('category', '==', category), orderBy('name'));
      }
      
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Product[];
      
      setProducts(productsData);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      await fetchProducts();
      return docRef.id;
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      throw new Error('Erro ao adicionar produto');
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      await updateDoc(doc(db, 'products', id), {
        ...productData,
        updatedAt: new Date(),
      });
      
      await fetchProducts();
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      throw new Error('Erro ao atualizar produto');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      await fetchProducts();
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
      throw new Error('Erro ao deletar produto');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};