
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash } from "lucide-react";
import { CartProduct, useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartProduct;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center p-4 border-b border-gray-200">
      <div className="w-24 h-24 mr-4 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
        <Button
          onClick={handleDecreaseQuantity}
          variant="outline"
          size="sm"
          className="p-1 h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-8 text-center">{item.quantity}</span>

        <Button
          onClick={handleIncreaseQuantity}
          variant="outline"
          size="sm"
          className="p-1 h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="ml-4 text-right">
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        <Button
          onClick={handleRemove}
          variant="ghost"
          size="sm"
          className="text-danger hover:text-danger-dark mt-2"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
