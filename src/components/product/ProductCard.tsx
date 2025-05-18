
import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category?: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      variant: "default",
    });
  };

  return (
    <div className="card-hover bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg font-bold bg-accent px-2 py-1 rounded-md">
            ${product.price.toFixed(2)}
          </span>
          <Button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary-dark text-white btn-hover"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
