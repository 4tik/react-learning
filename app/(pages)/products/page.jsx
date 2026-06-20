// app/products/page.js
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ProductService } from "@/services/products.service";

export default function ProductsPage() {
  
  // ==========================================================
  // 🟢 1. "SCRIPT" SECTION (Unified State Object & Handlers)
  // ==========================================================

  // Combined state object matching standard production quality
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: null,
  });

  // Computed state -> Equivalent to computed(() => products.value.length > 0)
  const hasProducts = useMemo(() => {
    return state.products && state.products.length > 0;
  }, [state.products]);

  // Modern `const` arrow function handling unified state pipeline mutations
  const getProducts = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await ProductService.getProducts();
      
      setState({
        products: data || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("[CATALOG_FETCH_FAILURE]:", err);
      setState({
        products: [],
        loading: false,
        error: "Unable to load products. Please refresh or check back later.",
      });
    }
  };

  // Lifecycle execution on component load -> Equivalent to onMounted()
  useEffect(() => {
    getProducts();
  }, []);


  // ==========================================================
  // 🎨 2. "TEMPLATE" SECTION (Sub-Layout Conditionals)
  // ==========================================================

  // Sub-Template: Loading/Skeleton State (v-if="state.loading")
  if (state.loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Product Catalog
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Explore real-time inventory synced via the Fake Store API.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-5 h-[380px] flex flex-col justify-between"
            >
              <div className="h-44 bg-gray-200 rounded-xl w-full mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-200 rounded w-5/6" />
                <div className="h-5 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="h-7 bg-gray-200 rounded w-1/4 mt-4" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  // Sub-Template: Error State Fallback (v-else-if="state.error")
  if (state.error) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="p-6 rounded-2xl bg-red-50 border border-red-100 text-center">
          <p className="text-red-700 font-medium">{state.error}</p>
          <button 
            onClick={getProducts}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // Sub-Template: Empty Inventory State (v-else-if="!hasProducts")
  if (!hasProducts) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <p className="text-center text-gray-500 py-12">No products found in stock.</p>
      </main>
    );
  }

  // Main Template Layout (v-else)
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Product Catalog
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Explore real-time inventory synced via the Fake Store API.
        </p>
      </header>

      {/* Grid Iteration Loop -> Equivalent to v-for="product in state.products" */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {state.products.map((product) => (
          <li
            key={product.id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <Link
              href={`/products/${product.id}`}
              className="p-5 flex flex-col h-full"
            >
              {/* Image Block */}
              <div className="relative h-48 w-full flex items-center justify-center mb-5 bg-white mix-blend-multiply overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Metadata */}
              <div className="flex flex-col flex-grow">
                <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-1">
                  {product.category}
                </span>

                <h2 className="font-bold text-gray-800 group-hover:text-blue-600 line-clamp-2 mb-2 transition-colors">
                  {product.title}
                </h2>

                <p className="text-2xl font-extrabold text-gray-900 mt-auto pt-4">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}