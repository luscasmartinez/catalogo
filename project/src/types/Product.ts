export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  subcategory: string;
  imageUrl: string;
  origin: string;
  unit: string;
  inStock: boolean;
  harvest: string;
  nutritionalInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory = 
  | 'grains' 
  | 'fruits' 
  | 'vegetables' 
  | 'legumes' 
  | 'herbs' 
  | 'seeds';

export const categoryLabels: Record<ProductCategory, string> = {
  grains: 'Grãos e Cereais',
  fruits: 'Frutas',
  vegetables: 'Vegetais',
  legumes: 'Leguminosas',
  herbs: 'Ervas e Temperos',
  seeds: 'Sementes'
};

export const subcategoriesByCategory: Record<ProductCategory, string[]> = {
  grains: ['Arroz', 'Milho', 'Trigo', 'Aveia', 'Cevada'],
  fruits: ['Frutas Cítricas', 'Frutas Tropicais', 'Frutas de Caroço', 'Frutas Vermelhas'],
  vegetables: ['Folhosos', 'Raízes', 'Bulbos', 'Crucíferas'],
  legumes: ['Feijões', 'Lentilhas', 'Grão-de-bico', 'Ervilhas'],
  herbs: ['Temperos Frescos', 'Ervas Secas', 'Condimentos'],
  seeds: ['Sementes Oleaginosas', 'Sementes para Plantio']
};