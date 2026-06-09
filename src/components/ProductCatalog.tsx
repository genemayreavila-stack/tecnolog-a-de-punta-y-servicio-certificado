/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data';
import { Search, SlidersHorizontal, Check, Star, ShoppingCart, Eye, AlertTriangle, ArrowUpDown, X } from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (product: Product, quantity: number, color: string) => void;
}

export default function ProductCatalog({ onAddToCart }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'celulares' | 'accesorios'>('todos');
  const [selectedBrand, setSelectedBrand] = useState('todos');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc' | 'rating'>('name');
  
  // Product Detail Modal State
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [buyQuantity, setBuyQuantity] = useState(1);

  // Get list of unique brands for the filter checkboxes
  const uniqueBrands = useMemo(() => {
    const brands = INITIAL_PRODUCTS.map(p => p.brand);
    return ['todos', ...Array.from(new Set(brands))];
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...INITIAL_PRODUCTS];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.subCategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'todos') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedBrand !== 'todos') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedBrand, sortBy]);

  const handleOpenDetailModal = (product: Product) => {
    setActiveModalProduct(product);
    setSelectedColor(product.colors[0]);
    setBuyQuantity(1);
  };

  const handleCloseDetailModal = () => {
    setActiveModalProduct(null);
  };

  const handleAddFromModal = () => {
    if (activeModalProduct) {
      onAddToCart(activeModalProduct, buyQuantity, selectedColor);
      handleCloseDetailModal();
    }
  };

  return (
    <section className="py-12 bg-[#0A0A0A] text-white" id="catalog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-8" id="catalog-header-layout">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-widest uppercase" id="catalog-section-title">
              Catálogo de Tecnología
            </h2>
            <p className="text-gray-400 text-sm mt-2" id="catalog-section-subtitle">
              Los mejores dispositivos libres de fábrica con empaques sellados y accesorios con certificación oficial.
            </p>
          </div>
        </div>

        {/* Search, filters & Sort bar layout */}
        <div className="bg-[#111111]/90 border border-white/10 p-5 rounded-3xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xl" id="catalog-controls">
          
          {/* Search inputs */}
          <div className="relative w-full md:max-w-md" id="search-input-wrapper">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" id="search-icon" />
            <input
              type="text"
              placeholder="Buscar marcas, modelos o accesorios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all"
              id="search-input"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto" id="quick-filters-group">
            {/* Category tabs */}
            <div className="flex bg-white/5 p-1 rounded-xl self-start w-full sm:w-auto border border-white/5" id="category-selector">
              {(['todos', 'celulares', 'accesorios'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  id={`tab-${cat}`}
                >
                  {cat === 'todos' ? 'Todos' : cat === 'celulares' ? 'Celulares' : 'Accesorios'}
                </button>
              ))}
            </div>

            {/* Brand Dropdown filter */}
            <div className="relative w-full sm:w-auto mt-2 sm:mt-0" id="brand-dropdown-wrapper">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full sm:w-auto bg-[#1C1C1E] border border-white/10 text-gray-350 text-xs font-semibold px-4 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer text-gray-300"
                id="brand-filter"
              >
                <option value="todos" className="bg-[#1C1C1E]">Marca: Todas</option>
                {uniqueBrands.filter(b => b !== 'todos').map((brand) => (
                  <option key={brand} value={brand} className="bg-[#1C1C1E]">{brand}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto mt-2 sm:mt-0" id="sort-dropdown-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto bg-[#1C1C1E] border border-white/10 text-gray-350 text-xs font-semibold px-4 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer text-gray-300"
                id="sort-filter"
              >
                <option value="name" className="bg-[#1C1C1E]">Ordenar: Nombre</option>
                <option value="price-asc" className="bg-[#1C1C1E]">Precio: Menor a Mayor</option>
                <option value="price-desc" className="bg-[#1C1C1E]">Precio: Mayor a Menor</option>
                <option value="rating" className="bg-[#1C1C1E]">Popularidad (★)</option>
              </select>
            </div>
          </div>
        </div>
        {/* Products Grid display */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#111111]/85 rounded-3xl border border-dashed border-white/10 px-4" id="empty-catalog-state">
            <span className="inline-block p-4 bg-white/5 rounded-full text-blue-400 mb-4 border border-white/5">
              <Search className="w-8 h-8" />
            </span>
            <h3 className="text-lg font-bold text-white mb-1">No se encontraron productos</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Prueba modificando tu búsqueda o desactivando algunos de los filtros de marca o categoría aplicados.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('todos'); setSelectedBrand('todos'); }}
              className="mt-4 bg-blue-600 font-bold text-xs text-white uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-500/20"
              id="clear-filters-button"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="products-grid">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#111111]/90 rounded-3xl border border-white/10 shadow-lg hover:shadow-2xl hover:border-white/20 transition-all flex flex-col justify-between overflow-hidden relative"
                id={`product-card-${product.id}`}
              >
                {/* Image and badges wrapper */}
                <div className="relative aspect-square overflow-hidden bg-white/5" id={`pcard-img-wrapper-${product.id}`}>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1" id={`pcard-badges-${product.id}`}>
                    {product.isNew && (
                      <span className="bg-blue-600 font-sans text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                        Nuevo
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-white text-black font-sans text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                        Oferta
                      </span>
                    )}
                    {product.stock <= 5 && (
                      <span className="bg-rose-600 font-sans text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm animate-pulse">
                        Últimos {product.stock}
                      </span>
                    )}
                  </div>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    id={`pcard-img-${product.id}`}
                  />

                  {/* Quick look on-hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3" id={`pcard-hover-actions-${product.id}`}>
                    <button
                      onClick={() => handleOpenDetailModal(product)}
                      className="p-3 bg-white text-black hover:bg-blue-600 hover:text-white shadow-xl hover:scale-110 transition-all cursor-pointer rounded-xl"
                      title="Detalles del producto"
                      id={`pcard-detail-btn-${product.id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(product, 1, product.colors[0]);
                      }}
                      className="p-3 bg-white text-black hover:bg-blue-600 hover:text-white shadow-xl hover:scale-110 transition-all cursor-pointer rounded-xl"
                      title="Añadir a carrito"
                      id={`pcard-cart-btn-${product.id}`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col justify-between" id={`pcard-info-${product.id}`}>
                  <div>
                    {/* Brand and category labels */}
                    <div className="flex items-center justify-between text-[11px] font-extrabold tracking-widest uppercase text-gray-400 mb-1" id={`pcard-meta-${product.id}`}>
                      <span>{product.brand}</span>
                      <span>{product.subCategory}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-bold text-sm tracking-tight group-hover:text-blue-400 transition-colors line-clamp-1 mb-2" id={`pcard-title-${product.id}`}>
                      {product.name}
                    </h3>

                    {/* Rating stars */}
                    <div className="flex items-center gap-1 mb-3" id={`pcard-rating-${product.id}`}>
                      <div className="flex text-blue-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-xs font-semibold text-gray-300">{product.rating}</span>
                      <span className="text-gray-500 text-xs">({product.reviewsCount})</span>
                    </div>

                    {/* Specs Preview snippet */}
                    <ul className="space-y-1 text-xs text-gray-400 mb-4 h-12 overflow-hidden" id={`pcard-specs-${product.id}`}>
                      {product.specs.slice(0, 2).map((spec, index) => (
                        <li key={index} className="flex items-start gap-1 line-clamp-1">
                          <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Cart button */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between" id={`pcard-action-bar-${product.id}`}>
                    <div id={`pcard-prices-${product.id}`}>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through block leading-none mb-1">
                          ${product.originalPrice} USD
                        </span>
                      )}
                      <span className="text-base font-black text-white block leading-none">
                        ${product.price} USD
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenDetailModal(product)}
                      className="bg-white hover:bg-gray-200 text-black font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                      id={`pcard-buy-btn-${product.id}`}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Modal component */}
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in" id="catalog-modal">
            <div className="relative bg-[#121212] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col md:flex-row animate-in zoom-in-95 duration-250 font-sans text-white" id="modal-content">
              {/* Close Button */}
              <button
                onClick={handleCloseDetailModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10 cursor-pointer"
                id="modal-close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Visual Box */}
              <div className="md:w-1/2 bg-black flex items-center justify-center p-6 relative border-r border-white/5" id="modal-visual">
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.name}
                  className="w-full h-auto aspect-square object-cover rounded-2xl shadow-xl max-h-96 opacity-95"
                  referrerPolicy="no-referrer"
                  id="modal-image"
                />
                
                {/* New badge on modal */}
                {activeModalProduct.isNew && (
                  <span className="absolute top-6 left-6 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg" id="modal-new-badge">
                    Novedad
                  </span>
                )}
              </div>

              {/* Product Info / Form Box */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between h-full bg-[#121212] self-stretch overflow-y-auto" id="modal-form">
                <div>
                  <span className="text-[10px] bg-blue-600/15 text-blue-400 border border-blue-500/20 font-black tracking-widest uppercase px-3 py-1.5 rounded-full inline-block mb-3" id="modal-brand-tag">
                    {activeModalProduct.brand} • {activeModalProduct.subCategory}
                  </span>

                  <h3 className="text-2xl font-black text-white leading-tight mb-2 uppercase tracking-wide" id="modal-title">
                    {activeModalProduct.name}
                  </h3>

                  {/* Reviews rating row */}
                  <div className="flex items-center gap-1.5 mb-4" id="modal-ratings-row">
                    <div className="flex text-blue-400">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current text-white/10" />
                    </div>
                    <span className="text-sm font-bold text-gray-300">{activeModalProduct.rating}</span>
                    <span className="text-gray-500 text-xs">({activeModalProduct.reviewsCount} opiniones)</span>
                  </div>

                  {/* Price banner */}
                  <div className="flex items-baseline gap-3 mb-4 p-3.5 bg-white/5 rounded-xl border border-white/5" id="modal-prices">
                    <span className="text-2xl font-black text-white">
                      ${activeModalProduct.price} USD
                    </span>
                    {activeModalProduct.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${activeModalProduct.originalPrice} USD
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6" id="modal-description">
                    {activeModalProduct.description}
                  </p>

                  {/* Specifications table */}
                  <div className="mb-6" id="modal-specs-box">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Ficha Técnica</h4>
                    <ul className="space-y-1.5" id="modal-specs-list">
                      {activeModalProduct.specs.map((spec, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-gray-450 leading-relaxed text-gray-400">
                          <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Config Form (Color, Qty) */}
                  <div className="space-y-4 pt-4 border-t border-white/10" id="modal-form-fields">
                    {/* Color selector */}
                    {activeModalProduct.colors.length > 0 && (
                      <div id="modal-colors-selection">
                        <label className="text-xs font-bold text-white uppercase tracking-widest block mb-1">
                          Elegir Color: <span className="text-blue-400 font-extrabold">{selectedColor}</span>
                        </label>
                        <div className="flex gap-2 mt-2" id="modal-colors-options">
                          {activeModalProduct.colors.map((color) => {
                            const isSelected = selectedColor === color;
                            return (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide border cursor-pointer transition-all ${
                                  isSelected
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                                    : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-300'
                                }`}
                                id={`color-${color}`}
                              >
                                {color}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Quantity selectors */}
                    <div id="modal-quantity-selection">
                      <label className="text-xs font-bold text-white uppercase tracking-widest block mb-2">Cantidad</label>
                      <div className="flex items-center gap-3" id="modal-quantity-group">
                        <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 items-center" id="modal-qty-counter">
                          <button
                            onClick={() => setBuyQuantity(prev => Math.max(1, prev - 1))}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-bold cursor-pointer"
                            id="modal-qty-minus"
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-sm font-black text-white" id="modal-qty-val">
                            {buyQuantity}
                          </span>
                          <button
                            onClick={() => setBuyQuantity(prev => Math.min(activeModalProduct.stock, prev + 1))}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-bold cursor-pointer"
                            id="modal-qty-plus"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs text-gray-400 font-medium mr-1">
                          {activeModalProduct.stock} unidades disponibles.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit button bar */}
                <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3" id="modal-actions">
                  <button
                    onClick={handleAddFromModal}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-xl shadow-xl shadow-blue-500/20 cursor-pointer text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 active:translate-y-0"
                    id="modal-add-to-cart-btn"
                  >
                    <ShoppingCart className="w-4 h-4 text-white" />
                    Agregar al Pedido (${(activeModalProduct.price * buyQuantity).toLocaleString()} USD)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
