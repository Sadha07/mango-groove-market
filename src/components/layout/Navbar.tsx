
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, LogIn, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">
            Mango <span className="text-accent-dark">Groove</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
            Mangoes
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
            About
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" className="p-1">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Link to="/profile">
                <Button variant="ghost" className="p-1">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-primary flex items-center space-x-1"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="primary" className="flex items-center space-x-1 bg-primary hover:bg-primary-dark">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white shadow-lg rounded-b-lg">
          <div className="flex flex-col px-4 py-2">
            <Link to="/" className="py-2 text-gray-700 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="py-2 text-gray-700 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Mangoes
            </Link>
            <Link to="/about" className="py-2 text-gray-700 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/cart" className="py-2 text-gray-700 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Cart ({totalItems})
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="py-2 text-gray-700 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button 
                  className="py-2 text-left text-gray-700 hover:text-primary transition-colors"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="py-2 text-gray-700 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
