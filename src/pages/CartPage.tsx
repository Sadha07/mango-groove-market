
import React from "react";
import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const CartPage: React.FC = () => {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to continue with checkout",
        variant: "destructive",
      });
      navigate("/login", { state: { redirectTo: "/cart" } });
      return;
    }

    // Simulate checkout process
    toast({
      title: "Order Placed!",
      description: "Your order has been successfully placed.",
    });
    clearCart();
    navigate("/");
  };

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-gray-400" />
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added any mangoes to your cart yet.
        </p>
        <Button 
          onClick={() => navigate("/products")}
          className="bg-primary hover:bg-primary-dark"
        >
          Browse Mangoes
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                Cart Items ({totalItems})
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </div>

            <div className="p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold">$5.00</span>
              </div>
              <div className="border-t border-gray-200 my-4 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-lg font-bold">
                    ${(totalPrice + 5).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button 
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-md btn-hover mt-4"
                size="lg"
              >
                Proceed to Checkout
              </Button>

              <button
                onClick={() => navigate("/products")}
                className="w-full text-primary hover:text-primary-dark text-center mt-4"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
