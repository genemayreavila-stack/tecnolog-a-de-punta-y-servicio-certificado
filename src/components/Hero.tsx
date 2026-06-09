/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Wrench, ShieldCheck, Sparkles, ArrowRight, Star, Award, Zap } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: 'inicio' | 'tienda' | 'servicio-tecnico' | 'mis-tickets') => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-[#0A0A0A] text-white py-12 lg:py-20" id="hero-section">
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-600/10 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center" id="hero-grid">
          
          {/* Hero text and navigation calls */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left" id="hero-left-col">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-blue-500/20"
              id="hero-badge"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              Soporte de Smartphone Nivel Premium
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-widest leading-none uppercase"
              id="hero-title"
            >
              Tecnología de punta y <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 block sm:inline font-black leading-[0.9] tracking-tighter">Servicio Certificado</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              id="hero-description"
            >
              En <strong>DeDicada</strong> somos apasionados por tu conexión móvil. Ofrecemos celulares de última generación con garantía certificada, accesorios premium de marcas líderes y un <strong>servicio técnico clínico ultrarrápido</strong>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              id="hero-cta-group"
            >
              <button
                onClick={() => onNavigate('tienda')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-blue-500/25 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                id="hero-cta-shop"
              >
                Explorar Catálogo
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => onNavigate('servicio-tecnico')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                id="hero-cta-tech"
              >
                <Wrench className="w-4 h-4 text-blue-400" />
                Soporte Técnico Especializado
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0"
              id="hero-metrics"
            >
              <div className="text-center lg:text-left" id="metric-orders">
                <span className="block text-2xl font-black text-white leading-none">100%</span>
                <span className="text-xs font-semibold text-gray-400 block mt-1">Repuestos Originales</span>
              </div>
              <div className="text-center lg:text-left" id="metric-warranty">
                <span className="block text-2xl font-black text-white leading-none">6 Meses</span>
                <span className="text-xs font-semibold text-gray-400 block mt-1">Garantía Escrita</span>
              </div>
              <div className="col-span-2 sm:col-span-1 text-center lg:text-left" id="metric-satisfaction">
                <div className="flex justify-center lg:justify-start items-center gap-1">
                  <span className="text-2xl font-black text-white leading-none">4.9</span>
                  <div className="flex text-blue-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-400 block mt-1">Soporte en Google</span>
              </div>
            </motion.div>
          </div>

          {/* Hero right side - Visual interactive banner */}
          <div className="lg:col-span-5 relative" id="hero-right-col">
            <div className="absolute w-72 h-72 bg-blue-600/10 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 p-1.5"
              id="hero-banner-image-container"
            >
              <img 
                src="https://images.unsplash.com/photo-1601524909162-be87252be298?w=800&auto=format&fit=crop&q=80" 
                alt="Laboratorio de Micro-soldadura y Servicio Técnico de Celulares DeDicada" 
                className="w-full h-80 object-cover rounded-2xl opacity-80 hover:opacity-100 transition-opacity duration-300"
                referrerPolicy="no-referrer"
                id="hero-banner-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6" id="banner-overlay">
                <span className="text-xs font-extrabold text-blue-400 bg-blue-600/10 self-start px-2.5 py-1 rounded-md border border-blue-500/20 uppercase tracking-wider mb-2">
                  Laboratorio Propio
                </span>
                <h3 className="text-white text-lg font-black tracking-tight uppercase">
                  Soporte Avanzado de Microelectrónica
                </h3>
                <p className="text-gray-300 text-xs mt-1">
                  Equipado con microscopía profesional, generadores de calor controlados y soldadores calibrados de alta precisión.
                </p>
              </div>
            </motion.div>

            {/* floating badges */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -top-4 -right-4 bg-[#121212]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3"
              id="hero-floating-repair"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Mantenimiento Express</p>
                <p className="text-[10px] text-blue-400 font-extrabold">Hecho en &lt; 1 hora</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="absolute -bottom-4 -left-4 bg-[#121212]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3"
              id="hero-floating-shield"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Garantía Escrita</p>
                <p className="text-[10px] text-gray-400 font-semibold">Cobertura total de hardware</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bento features overview */}
        <div className="pt-16 sm:pt-24 grid grid-cols-1 md:grid-cols-3 gap-8" id="hero-bento-features">
          
          <div className="bg-[#111111]/80 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-xl hover:bg-white/[0.04] transition-all flex flex-col justify-between group" id="bento-smartphones">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-all border border-blue-500/20">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Smartphones Genuinos</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Encuentra los últimos iPhones, la serie Galaxy de Samsung y los potentes Xiaomi. Todos listos para usar libres de fábrica con 1 año de garantía extendida.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('tienda')}
              className="text-blue-450 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all text-left text-blue-400"
              id="bento-smartphones-button"
            >
              Comprar Celulares
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-[#111111]/80 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-xl hover:bg-white/[0.04] transition-all flex flex-col justify-between group animate-pulse-subtle" id="bento-repair">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/15 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-all border border-blue-500/30">
                <Wrench className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Clínica de Reparaciones</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                ¿Tu pantalla se estrelló o tu batería dura poco? Cotiza al instante tu reparación con nuestro simulador dinámico, agenda un turno y retíralo hoy mismo.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('servicio-tecnico')}
              className="text-blue-450 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all text-left text-blue-400"
              id="bento-repair-button"
            >
              Probar Cotizador en Vivo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-[#111111]/80 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-xl hover:bg-white/[0.04] transition-all flex flex-col justify-between group" id="bento-gear">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-all border border-indigo-500/20">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Accesorios AAA+</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Carga ultra rápida segura, fundas de alto impacto Spigen, audífonos estéreo con audio inmersivo y protectores cerámicos aplicados sin burbujas en nuestra tienda.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('tienda')}
              className="text-indigo-455 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all text-left text-indigo-400"
              id="bento-gear-button"
            >
              Explorar Accesorios
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
