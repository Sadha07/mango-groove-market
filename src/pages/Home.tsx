
import React, { useState, useEffect } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import { Product } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import mockProducts from "@/utils/mockData";

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get products
    const fetchProducts = async () => {
      try {
        // In a real app, fetch from API
        // For now, use our mock data
        setFeaturedProducts(mockProducts.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary to-secondary-light py-20 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              The  Mangoes Delivered to Your Door
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Experience the sweet, juicy taste of premium quality mangoes. 
              From farm to table, we bring you the world's best varieties.
            </p>
            <div className="flex gap-4">
              <Button 
                className="bg-primary hover:bg-primary-dark text-white px-8 py-2 rounded-md btn-hover"
                size="lg"
              >
                Shop Now
              </Button>
              <Button 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-2 rounded-md btn-hover"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
              alt="Fresh mangoes" 
              className="rounded-lg shadow-xl max-h-96 object-cover w-full animate-fade-in"
            />
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Mangoes</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover our hand-picked selection of the finest mangoes from around the world. 
            Each variety offers a unique flavor profile and texture.
          </p>
          
          {loading ? (
            <div className="flex justify-center">
              <p>Loading products...</p>
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}

          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-2 rounded-md btn-hover">
              View All Mangoes
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Mango Groove?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl text-primary mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-3">Farm Fresh</h3>
              <p className="text-gray-600">
                Our mangoes go from farm to your table in record time, ensuring maximum freshness and flavor.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl text-primary mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Enjoy quick and reliable delivery of your favorite mangoes right to your doorstep.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl text-primary mb-4">🥭</div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                We carefully select only the best mangoes, ensuring exceptional taste and quality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-accent text-2xl mb-4">★★★★★</div>
              <p className="italic text-gray-600 mb-4">
                "The mangoes were perfectly ripe and incredibly sweet. Best I've ever had!"
              </p>
              <p className="font-semibold">— Sarah L.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-accent text-2xl mb-4">★★★★★</div>
              <p className="italic text-gray-600 mb-4">
                "Fast delivery and exceptional quality. Will definitely order again."
              </p>
              <p className="font-semibold">— James R.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-accent text-2xl mb-4">★★★★★</div>
              <p className="italic text-gray-600 mb-4">
                "Their Alphonso mangoes are a taste of heaven. Highly recommended!"
              </p>
              <p className="font-semibold">— Maria G.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
