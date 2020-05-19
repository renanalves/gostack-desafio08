import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const productsData = await AsyncStorage.getItem(
        '@GoMarketplace:products',
      );

      if (productsData) {
        setProducts([...JSON.parse(productsData)]);
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(async product => {
    const productExists = data.find(p => p.id === product.id);

    const quantity = productExists ? productExists.quantity + 1 : 1;

    if (productExists) {
      setData(
        data.map(p => (p.id === product.id ? { ...product, quantity } : p)),
      );
    } else {
      setData([...data, { ...product, quantity }]);
    }

    await AsyncStorage.setItem('@GoMarketplace:products', JSON.stringify(data));
  }, []);

  const increment = useCallback(async id => {
    // TODO INCREMENTS A PRODUCT QUANTITY IN THE CART
  }, []);

  const decrement = useCallback(async id => {
    // TODO DECREMENTS A PRODUCT QUANTITY IN THE CART
  }, []);

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
