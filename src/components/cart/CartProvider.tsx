import { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '@/components/admin/types';
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  items: Course[];
  addItem: (course: Course) => void;
  removeItem: (courseId: string) => void;
  total: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Course[]>([]);
  const { toast } = useToast();

  const addItem = (course: Course) => {
    if (!items.find(item => item.id === course.id)) {
      setItems([...items, course]);
      toast({
        title: "Course added to cart",
        description: `${course.title} has been added to your cart.`
      });
    } else {
      toast({
        title: "Course already in cart",
        description: "This course is already in your cart.",
        variant: "destructive"
      });
    }
  };

  const removeItem = (courseId: string) => {
    setItems(items.filter(item => item.id !== courseId));
    toast({
      title: "Course removed",
      description: "The course has been removed from your cart."
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, total, clearCart }}>
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