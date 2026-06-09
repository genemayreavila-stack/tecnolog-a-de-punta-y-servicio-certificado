/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import RepairService from './components/RepairService';
import StatusTracker from './components/StatusTracker';
import ShoppingCart from './components/ShoppingCart';
import { Product, CartItem, RepairTicket } from './types';
import { INITIAL_PRODUCTS } from './data';
import { Smartphone, Wrench, ShieldCheck, Mail, MapPin, Phone, Clock, Star, Heart, HelpCircle, ArrowRight, CornerDownRight, MessageSquare, Award } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<'inicio' | 'tienda' | 'servicio-tecnico' | 'mis-tickets'>('inicio');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [tickets, setTickets] = useState<RepairTicket[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Load persistent cart & booked tickets from LocalStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('dedicada_cart_items');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      const storedTickets = localStorage.getItem('dedicada_repair_tickets');
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
    } catch (e) {
      console.warn("Could not read from local storage", e);
    }
  }, []);

  // Save changes to localStorage
  const saveCartToStorage = (items: CartItem[]) => {
    try {
      localStorage.setItem('dedicada_cart_items', JSON.stringify(items));
    } catch (e) {
      console.error("Save cart failed", e);
    }
  };

  const saveTicketsToStorage = (allTickets: RepairTicket[]) => {
    try {
      localStorage.setItem('dedicada_repair_tickets', JSON.stringify(allTickets));
    } catch (e) {
      console.error("Save tickets failed", e);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number, color: string) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.selectedColor === color
    );

    let updatedCart = [...cartItems];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({
        product,
        quantity,
        selectedColor: color
      });
    }

    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
    setCartOpen(true); // Automatically expand cart drawer on addition for supreme UX
  };

  const handleUpdateCartQuantity = (productId: string, color: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, color);
      return;
    }

    const updated = cartItems.map((item) => {
      if (item.product.id === productId && item.selectedColor === color) {
        return { ...item, quantity: newQty };
      }
      return item;
    });

    setCartItems(updated);
    saveCartToStorage(updated);
  };

  const handleRemoveCartItem = (productId: string, color: string) => {
    const filtered = cartItems.filter(
      (item) => !(item.product.id === productId && item.selectedColor === color)
    );
    setCartItems(filtered);
    saveCartToStorage(filtered);
  };

  const handleClearCart = () => {
    setCartItems([]);
    saveCartToStorage([]);
  };

  // Registering Technical Tickets
  const handleAddRepairTicket = (newTicket: RepairTicket) => {
    const updated = [newTicket, ...tickets];
    setTickets(updated);
    saveTicketsToStorage(updated);
  };

  const cartItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Filter curated features for the landing block (iPhone 15 Pro, S24 Ultra, Airpods Pro)
  const featuredProducts = INITIAL_PRODUCTS.filter(p => p.isFeatured);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-400 selection:text-slate-950" id="dedicada-app">
      
      {/* 1. Universal Top Header */}
      <Header 
        currentView={currentView}
        setView={setView}
        cartCount={cartItemsCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 2. Main Viewport Selector Switch */}
      <main className="flex-1" id="main-content-area">
        {currentView === 'inicio' && (
          <div className="animate-in fade-in duration-300" id="view-inicio">
            {/* Banner slide */}
            <Hero onNavigate={setView} />

            {/* Curated featured items layout */}
            <section className="py-16 bg-white border-t border-slate-100" id="curated-featured-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-12" id="curated-headlines">
                  <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-500/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                    SELECCIÓN ESPECIAL DE TEMPORADA
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    Equipos y Accesorios Más Buscados
                  </h2>
                  <p className="text-slate-500 text-sm mt-2">
                    Nuestros especialistas seleccionan semanalmente los dispositivos con mejores tasas de rendimiento y menor índice de reparación histórica. Garantía extendida DeDicada de cortesía.
                  </p>
                </div>

                {/* 3 Featured Products Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="curated-products-grid">
                  {featuredProducts.map((p) => {
                    return (
                      <div 
                        key={p.id}
                        className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden group hover:shadow-xl transition-all p-5 flex flex-col justify-between"
                        id={`featured-pcard-${p.id}`}
                      >
                        <div>
                          <div className="aspect-square rounded-2xl overflow-hidden bg-white mb-5 relative" id={`featured-pcard-img-box-${p.id}`}>
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                              id={`featured-pcard-img-${p.id}`}
                            />
                            {p.originalPrice && (
                              <span className="absolute top-3 left-3 bg-amber-500 text-slate-900 font-extrabold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md">
                                Oferta Especial
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-2" id={`featured-pcard-meta-${p.id}`}>
                            <span>{p.brand}</span>
                            <span>{p.subCategory}</span>
                          </div>

                          <h3 className="text-slate-900 font-bold text-base leading-tight mb-2 group-hover:text-amber-500 transition-colors" id={`featured-pcard-title-${p.id}`}>
                            {p.name}
                          </h3>

                          <ul className="text-xs text-slate-500 space-y-1 mb-4" id={`featured-pcard-specs-${p.id}`}>
                            {p.specs.slice(0, 3).map((spec, sIdx) => (
                              <li key={sIdx} className="flex gap-1.5 items-start">
                                <CornerDownRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-200/50" id={`featured-pcard-bottom-${p.id}`}>
                          <div id={`featured-pcard-prices-${p.id}`}>
                            {p.originalPrice && (
                              <span className="text-xs text-slate-400 line-through block leading-none mb-1">
                                ${p.originalPrice} USD
                              </span>
                            )}
                            <span className="text-base font-black text-slate-900 block leading-none">
                              ${p.price} USD
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setView('tienda');
                              // Standard browser smooth scroll up is handled automatically
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                            id={`featured-pcard-buy-btn-${p.id}`}
                          >
                            Ver Detalles
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Big Promotional Banner */}
                <div className="mt-16 bg-slate-900 rounded-3xl text-white p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl" id="promo-banner-inicio">
                  <div className="absolute top-0 right-0 w-1/4 h-full bg-amber-500/10 pointer-events-none filter blur-xl transform skew-x-12" />
                  
                  <div className="space-y-4 max-w-2xl text-center md:text-left" id="promo-banner-text">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
                      Doble Vía de Garantía
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      ¿Tu celular actual se descompuso? Te lo tomamos como forma de pago
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Si traes tu teléfono móvil roto o golpeado para cambiarlo por un modelo nuevo, nuestros tasadores diagnostican la falla en el acto y te bonifican el repuesto o te descuentan el valor de reparación en tu nueva compra. ¡Soporte inteligente!
                    </p>
                  </div>

                  <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-3" id="promo-banner-ctas">
                    <button
                      onClick={() => setView('servicio-tecnico')}
                      className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
                      id="promo-cta-quote"
                    >
                      Cotizar mi usadito
                    </button>
                    <button
                      onClick={() => setView('tienda')}
                      className="w-full sm:w-auto bg-transparent hover:bg-slate-800 text-white border border-slate-700 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
                      id="promo-cta-catalog"
                    >
                      Ver Catálogo Completo
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* General FAQs informative block */}
            <section className="py-16 bg-slate-50 border-t border-slate-100" id="faqs-inicio-section">
              <div className="max-w-4xl mx-auto px-4 sm:px-6">
                
                <div className="text-center mb-12" id="faqs-headlines">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Preguntas Frecuentes</h3>
                  <p className="text-slate-500 text-sm mt-1">Resolvemos tus dudas al instante sobre envíos, garantías y reparaciones.</p>
                </div>

                <div className="space-y-4" id="faqs-wrapper">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm" id="faq-1">
                    <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      ¿Cuánto tiempo demora el cambio de pantalla o batería express?
                    </h4>
                    <p className="text-slate-600 text-xs mt-2.5 leading-relaxed pl-6">
                      Si reservas tu turno técnico mediante nuestro portal en línea antes de de presentarte, las reparaciones de módulo de pantalla y cambio de batería se realizan de forma <strong>express en 45 a 90 minutos</strong>. Puedes aguardar cómodamente en nuestro salón de café corporativo.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm" id="faq-2">
                    <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      ¿Qué tipo de repuestos utilizan en el laboratorio técnico?
                    </h4>
                    <p className="text-slate-600 text-xs mt-2.5 leading-relaxed pl-6">
                      Utilizamos exclusivamente <strong>repuestos originales de la marca (OEM)</strong> o, en su defecto por compatibilidad de fabricante discontinuado, repuestos <strong>Clase AAA de máxima calidad con calibración certificada</strong>. Nunca colocamos imitaciones baratas que pongan en peligro la vida útil del circuito base.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm" id="faq-3">
                    <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      ¿Cómo funciona el envío del catálogo a domicilio y la reserva?
                    </h4>
                    <p className="text-slate-600 text-xs mt-2.5 leading-relaxed pl-6">
                      Agregas tus artículos preferidos a tu carrito de compras virtual, seleccionas "Envío Express" o "Retiro en Tienda", eliges tu método de pago y confirmas tu pedido. El portal genera un Ticket Electrónico con el que puedes enviarnos un WhatsApp. Un asesor coordinará tu envío express o te esperará con el producto empacado.
                    </p>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {currentView === 'tienda' && (
          <div className="animate-in fade-in duration-300" id="view-tienda">
            <ProductCatalog onAddToCart={handleAddToCart} />
          </div>
        )}

        {currentView === 'servicio-tecnico' && (
          <div className="animate-in fade-in duration-300" id="view-servicio-tecnico">
            <RepairService 
              onAddRepairTicket={handleAddRepairTicket} 
              onNavigateToTracker={() => setView('mis-tickets')}
            />
          </div>
        )}

        {currentView === 'mis-tickets' && (
          <div className="animate-in fade-in duration-300" id="view-mis-tickets">
            <StatusTracker tickets={tickets} />
          </div>
        )}
      </main>

      {/* 3. Universal Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16" id="footer-inner-grid">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12" id="footer-cols">
            
            {/* Col 1: Logo & Brand pitch */}
            <div className="space-y-4" id="fcol-logo-desc">
              <div className="flex items-center gap-2.5 text-left" id="fcol-logo">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-lg font-black tracking-tight text-white block">
                  De<span className="text-amber-400">Dicada</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed" id="fcol-desc-text">
                Comercializadora premium de smartphones y laboratorio avanzado de micro-reparación móvil con garantía escrita legal. Te brindamos el soporte que tu terminal realmente merece.
              </p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400" id="fcol-location-tag">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Av. Central 1024, Barrio Tecnológico
              </div>
            </div>

            {/* Col 2: Navigation shortcuts */}
            <div className="space-y-4" id="fcol-links">
              <h4 className="text-xs uppercase tracking-widest font-extrabold text-amber-400">MENÚ RÁPIDO</h4>
              <ul className="space-y-2 text-xs text-slate-400" id="fcol-links-list">
                <li><button onClick={() => setView('inicio')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">Inicio de Tienda</button></li>
                <li><button onClick={() => setView('tienda')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">Ver Catálogo</button></li>
                <li><button onClick={() => setView('servicio-tecnico')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">Simular Reparación</button></li>
                <li><button onClick={() => setView('mis-tickets')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">Soporte Técnico en Vivo</button></li>
              </ul>
            </div>

            {/* Col 3: Technical timings */}
            <div className="space-y-4" id="fcol-timings">
              <h4 className="text-xs uppercase tracking-widest font-extrabold text-amber-400">HORARIO DE ATENCIÓN</h4>
              <ul className="space-y-2.5 text-xs text-slate-400" id="fcol-timings-list">
                <li className="flex gap-2 items-start">
                  <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-bold text-slate-300">Lunes a Viernes:</span>
                    <span className="block text-[11px]">9:00 AM - 7:00 PM (Horario corrido)</span>
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-bold text-slate-300">Sábado:</span>
                    <span className="block text-[11px]">9:00 AM - 2:00 PM</span>
                  </div>
                </li>
                <li className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 inline-block">
                  Atención sin turno previo
                </li>
              </ul>
            </div>

            {/* Col 4: Contacts & Assistance hotline */}
            <div className="space-y-4" id="fcol-assistance">
              <h4 className="text-xs uppercase tracking-widest font-extrabold text-amber-400">CENTRAL MULTICANAL</h4>
              <ul className="space-y-2.5 text-xs text-slate-400" id="fcol-assistance-list">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="font-semibold text-slate-300">+1 (555) 732-2824</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="font-semibold text-slate-300">soporte@dedicada.com</span>
                </li>
                <li className="pt-2">
                  <a 
                    href="https://wa.me/15557322824" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-left transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>WhatsApp Express</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright row */}
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 md:flex md:justify-between items-center" id="footer-copyright-bar">
            <p id="copyright-text">
              © {new Date().getFullYear()} DeDicada Celulares & Servicio Técnico Especializado. Todos los derechos reservados.
            </p>
            <p className="text-[9px] text-slate-600 mt-2 md:mt-0 flex justify-center items-center gap-1.5" id="developer-by-text">
              <Award className="w-3.5 h-3.5 text-slate-500" />
              <span>Plataforma Premium calibrada conforme políticas del Consumidor</span>
            </p>
          </div>
        </div>
      </footer>

      {/* 4. Sliding Interactive Shopping Cart Drawer overlay */}
      <ShoppingCart 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
