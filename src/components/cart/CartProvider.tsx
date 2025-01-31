import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Course } from '@/components/admin/types';
import { useToast } from "@/hooks/use-toast";
import api from '@/api/api';

interface CartContextType {
  items: Course[];
  addItem: (course: Course) => void;
  removeItem: (courseId: string) => void;
  total: number;
  clearCart: () => void;
  fetchCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Course[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { toast } = useToast();

  // Fetch cart from API on mount
  const fetchCart = async () => {
    try {
      const res = await api.get<{ items: Course[], total: number }>("/api/cart");
      setItems(res.data.items)
      setTotal(res.data.total)
    } catch (error) {
      console.error("Error fetching cart:", error?.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItem = async (course: Course) => {
    try {
        await api.post('/api/cart/add', { courseId: course.id})
        toast({
          title: "Course added to cart",
          description: `${course.title} has been added to your cart.`
        });
        fetchCart();
    } catch (error) {
      toast({
        title: "Course already in cart",
        description: "This course is already in your cart.",
        variant: "destructive"
      })
    }
  };

  const removeItem = async (courseId: string) => {
    try {
      await api.delete(`/api/cart/${courseId}`)
      toast({
        title: "Course removed",
        description: "The course has been removed from your cart."
      });
      fetchCart()
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error.response?.data?.message || "Failed to remove course", 
        variant: "destructive" 
      });
    }
  };

  const clearCart = async() => {
    try {
      await api.delete('/api/cart');

      toast({ title: "Cart cleared", description: "Your cart is now empty." });
      fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, total, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};