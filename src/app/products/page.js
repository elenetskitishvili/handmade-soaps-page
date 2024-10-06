'use client';
import React, { useState, useEffect } from 'react';

import './products.css';
import ProductCard from '../components/ProductCard/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://dummyjson.com/products');

        // if (!Response.ok)
        //   throw new Error('Somthing went wrong with fetching Products');

        const data = await res.json();

        if (data.Response === 'False') throw new Error('Products not found!');
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className='main main-products'>
      <section className='section-products'>
        {isLoading && <p className='section-products__intro'>Loading...</p>}
        {!isLoading && !error && (
          <>
            <p className='section-products__intro'>
              Discover our collection of handmade soaps, crafted with natural
              ingredients to nourish your skin
            </p>

            <ul className='products'>
              {products.map((product) => (
                <ProductCard productsObj={product} key={product.id} />
              ))}
            </ul>
          </>
        )}
        {error && <span className='section-products__intro'> {error}</span>}
      </section>
    </main>
  );
}

export default Products;
