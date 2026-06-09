/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Smartphone, Wrench, ShoppingBag, Menu, X, Clock, MapPin, ClipboardList, Info } from 'lucide-react';

interface HeaderProps {
  currentView: 'inicio' | 'tienda' | 'servicio-tecnico' | 'mis-tickets';
  setView: (view: 'inicio' | 'tienda' | 'servicio-tecnico' | 'mis-tickets') => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ currentView, setView, cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Smartphone },
    { id: 'tienda', label: 'Catálogo', icon: ShoppingBag },
    { id: 'servicio-tecnico', label: 'Servicio Técnico', icon: Wrench },
    { id: 'mis-tickets', label: 'Tus Solicitudes', icon: ClipboardList },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 shadow-lg" id="main-header">
      {/* Top micro bar for corporate info */}
      <div className="bg-black text-white text-xs py-2 px-4 sm:px-6 lg:px-8 hidden sm:flex justify-between items-center border-b border-white/5" id="micro-bar">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-gray-400">
            <Clock className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            Lunes a Sábado: 9:00 AM - 7:00 PM
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            Av. Central 1024, Barrio Tecnológico
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-600/10 text-blue-400 px-3 py-0.5 rounded-full border border-blue-500/20 font-semibold">
          <Info className="w-3 h-3" />
          <span>Soporte Express Realizado en el Día</span>
        </div>
      </div>

      {/* Main navigation header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between" id="navigation-bar">
        {/* Logo and Brand */}
        <button 
          onClick={() => { setView('inicio'); setMobileMenuOpen(false); }}
          className="flex items-center gap-2.5 text-left group transition-all"
          id="logo-button"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Smartphone className="w-5 h-5 text-white group-hover:rotate-6 transition-transform" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white block leading-none">
              De<span className="text-blue-500 font-black">Dicada</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mt-1">
              Celulares & Servicio
            </span>
          </div>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-1 lg:gap-2" id="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
                id={`nav-${item.id}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions bar (Cart + Contact Button) */}
        <div className="flex items-center gap-3" id="header-actions">
          {/* Shopping Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group"
            aria-label="Ver Carrito de compra"
            id="cart-trigger"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-extrabold text-[10px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-[#0A0A0A] animate-pulse" id="cart-counter">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick Quote / Technical Service Button */}
          <button
            onClick={() => setView('servicio-tecnico')}
            className="hidden sm:inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/5 active:scale-95 cursor-pointer"
            id="quick-quote-button"
          >
            <Wrench className="w-3.5 h-3.5" />
            Cotizar Reparación
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white md:hidden transition-colors"
            aria-label="Abrir Menú"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0A0A]/95 backdrop-blur-md px-4 py-4 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top duration-200" id="mobile-menu-drawer">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
                id={`mobile-nav-${item.id}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setView('servicio-tecnico');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all animate-pulse"
              id="mobile-quote-button"
            >
              <Wrench className="w-4 h-4" />
              Cotizar Reparación en Línea
            </button>
            <div className="text-center text-xs text-slate-500 py-2 space-y-1">
              <p>📍 Av. Central 1024, Barrio Tecnológico</p>
              <p>📞 Tel: +1 (555) 732-2824</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
