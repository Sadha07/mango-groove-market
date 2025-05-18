
import React, { useState, useEffect } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import { Product } from "@/components/product/ProductCard";
import mockProducts from "@/utils/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate API call to get products
    const fetchProducts = async () => {
      try {
        // In a real app, fetch from API
        // For now, use our mock data
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Mango Collection</h1>

      {/* Search and filter section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex">
          <div className="relative flex-grow mr-2">
            <Input
              type="text"
              placeholder="Search mangoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
          </div>
          <Button onClick={handleSearch} className="bg-primary hover:bg-primary-dark">
            Search
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p>No products found matching "{searchQuery}"</p>
          <Button 
            onClick={() => {
              setSearchQuery("");
              setFilteredProducts(products);
            }}
            className="mt-4 bg-primary hover:bg-primary-dark"
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};

export default ProductsPage;
