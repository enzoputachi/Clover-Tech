import { useState } from "react";
import { Menu, ShoppingCart, X, BriefcaseIcon, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./cart/CartProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              Clover Tech
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-600 hover:text-primary">About</Link>
            <Link to="/courses" className="text-gray-600 hover:text-primary">Courses</Link>
            <Link to="/portfolio" className="text-gray-600 hover:text-primary flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4" />
              Portfolio
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="default">Login / Sign Up</Button>
              </Link>
            )}
            
            <Link to="/cart" className="text-gray-600 hover:text-primary relative">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="text-gray-600 hover:text-primary relative">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b">
            <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-primary">About</Link>
            <Link to="/courses" className="block px-3 py-2 text-gray-600 hover:text-primary">Courses</Link>
            <Link to="/portfolio" className="block px-3 py-2 text-gray-600 hover:text-primary flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4" />
              Portfolio
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-primary">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-gray-600 hover:text-primary flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="block px-3 py-2">
                <Button variant="default" className="w-full">Login / Sign Up</Button>
              </Link>
            )}
            
            {isAuthenticated && (
              <Link to="/cart" className="block px-3 py-2 text-gray-600 hover:text-primary">
                <div className="flex items-center">
                  <ShoppingCart className="h-6 w-6 mr-2" />
                  Cart {items.length > 0 && `(${items.length})`}
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};