/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { RepairTicket, RepairStatus } from '../types';
import { ClipboardList, Search, Clock, FileCheck, CheckCircle2, ShieldCheck, AlertCircle, HardDrive, Smartphone, Wrench } from 'lucide-react';

interface StatusTrackerProps {
  tickets: RepairTicket[];
}

// Built-in professional demo tickets for instant testing
const DEMO_TICKETS: RepairTicket[] = [
  {
    id: 'DD-3104',
    customerName: 'Santiago Luján',
    customerPhone: '+1 (555) 304-4512',
    deviceBrand: 'Apple',
    deviceModel: 'iPhone 14 Pro Max',
    damageType: 'Cambio de Pantalla (Módulo Completo)',
    estimatedCost: 112,
    estimatedTime: '45 a 90 minutos (Express)',
    status: 'reparando',
    date: '08 de Junio, 2026',
    notes: 'Vidrio totalmente estrellado con fugas de luz. El táctil responde a veces.',
    statusHistory: [
      {
        status: 'recibido',
        timestamp: '08 de Junio, 2026 - 10:30 AM',
        description: 'Dispositivo ingresado en recepción de Av. Central. Se firma acuse de hardware.'
      },
      {
        status: 'diagnostico',
        timestamp: '08 de Junio, 2026 - 11:15 AM',
        description: 'Diagnóstico clínico completado. Se confirma que el panel táctil está dañado pero la placa madre está al 100% sana.'
      },
      {
        status: 'reparando',
        timestamp: '09 de Junio, 2026 - 09:00 AM',
        description: 'Dispositivo en banco de servicio. Módulo dañado removido; instalando empaque hermético y pantalla original.'
      }
    ]
  },
  {
    id: 'DD-8812',
    customerName: 'Valeria Gatti',
    customerPhone: '+1 (555) 712-9012',
    deviceBrand: 'Samsung',
    deviceModel: 'Galaxy S23 Ultra',
    damageType: 'Reemplazo de Batería Alta Vida Útil',
    estimatedCost: 49,
    estimatedTime: '30 a 45 minutos',
    status: 'listo',
    date: '09 de Junio, 2026',
    notes: 'La carga baja repentinamente del 40% al 10%. Reporta ciclos de carga altos.',
    statusHistory: [
      {
        status: 'recibido',
        timestamp: '09 de Junio, 2026 - 11:00 AM',
        description: 'Equipo recibido en mostrador.'
      },
      {
        status: 'diagnostico',
        timestamp: '09 de Junio, 2026 - 11:20 AM',
        description: 'Diagnóstico por software indica que la batería se encuentra al 74% de salud de sus ciclos normales.'
      },
      {
        status: 'reparando',
        timestamp: '09 de Junio, 2026 - 11:45 AM',
        description: 'Batería defectuosa retirada con disolventes seguros e instalando celda premium certificada.'
      },
      {
        status: 'calidad',
        timestamp: '09 de Junio, 2026 - 12:15 PM',
        description: 'Control de amperaje y ciclos de recalentamiento superados con un 100% de eficiencia en osciloscopio.'
      },
      {
        status: 'listo',
        timestamp: '09 de Junio, 2026 - 12:45 PM',
        description: '¡Equipo reparado! Notificación enviada por WhatsApp al cliente para su retiro inmediato.'
      }
    ]
  },
  {
    id: 'DD-1294',
    customerName: 'Juan Manuel Blanco',
    customerPhone: '+1 (555) 129-8431',
    deviceBrand: 'Xiaomi',
    deviceModel: 'Redmi Note 13 Pro',
    damageType: 'Tratamiento Ultrasónico por Daño de Agua (Humedad)',
    estimatedCost: 39,
    estimatedTime: '24 horas (Diagnóstico profundo)',
    status: 'diagnostico',
    date: '09 de Junio, 2026',
    notes: 'Se cayó en piscina hace 3 días. No enciende. Se intentó cargar pero no responde.',
    statusHistory: [
      {
        status: 'recibido',
        timestamp: '09 de Junio, 2026 - 03:30 PM',
        description: 'Ingresado de urgencia por daño líquido. Desconexión de batería preventiva inmediata realizada en mostrador.'
      },
      {
        status: 'diagnostico',
        timestamp: '09 de Junio, 2026 - 05:20 PM',
        description: 'Equipo abierto en laboratorio. Presenta residuos de sulfato severo cerca de pines de batería y conector FPC de pantalla.'
      }
    ]
  }
];

export default function StatusTracker({ tickets }: StatusTrackerProps) {
  const [searchId, setSearchId] = useState('');
  const [queriedTicket, setQueriedTicket] = useState<RepairTicket | null>(DEMO_TICKETS[1]); // Preload ready demo initially for instant preview
  const [searchFailed, setSearchFailed] = useState(false);

  // Combine user custom booked tickets + static demos
  const allAvailableTickets = useMemo(() => {
    return [...tickets, ...DEMO_TICKETS];
  }, [tickets]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFailed(false);

    if (searchId.trim() === '') return;

    // Search case insensitive and without spaces
    const refinedId = searchId.trim().toUpperCase();
    const found = allAvailableTickets.find(t => t.id === refinedId);

    if (found) {
      setQueriedTicket(found);
    } else {
      setQueriedTicket(null);
      setSearchFailed(true);
    }
  };

  const handleSelectDemo = (ticket: RepairTicket) => {
    setQueriedTicket(ticket);
    setSearchId(ticket.id);
    setSearchFailed(false);
  };

  // Stepper timeline definition
  const steps = [
    { key: 'recibido', label: '1. Recibido', desc: 'Dispositivo ingresado y registrado con ID.' },
    { key: 'diagnostico', label: '2. Diagnóstico', desc: 'Análisis clínico de placa, componentes y flex.' },
    { key: 'reparando', label: '3. En Reparación', desc: 'Intervención activa en soldadura o cambio estético.' },
    { key: 'calidad', label: '4. Control de Calidad', desc: 'Pruebas de durabilidad, disipación y sensores.' },
    { key: 'listo', label: '5. Listo para Retirar', desc: 'Reparación de hardware finalizada con sello.' }
  ];

  // Helper to determine status progress index
  const getStatusIndex = (status: RepairStatus) => {
    const list: RepairStatus[] = ['recibido', 'diagnostico', 'reparando', 'calidad', 'listo'];
    return list.indexOf(status);
  };

  const currentStatusIndex = queriedTicket ? getStatusIndex(queriedTicket.status) : -1;

  return (
    <section className="py-12 bg-[#0A0A0A] text-white" id="tracker-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10" id="tracker-header">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-widest uppercase" id="tracker-title">
            Seguimiento en Vivo de tu Equipo
          </h2>
          <p className="text-gray-400 font-medium text-sm mt-2" id="tracker-desc">
            Transparencia total en tu reparación. Introduce tu código de ticket (Ej, <strong className="text-blue-400 font-bold">DD-XXXX</strong>) para ver en tiempo real en cuál de nuestros laboratorios se encuentra trabajando un especialista.
          </p>
        </div>

        {/* Central Search block */}
        <div className="max-w-xl mx-auto mb-12" id="tracker-search-engine">
          <form onSubmit={handleSearch} className="flex gap-2" id="tracker-search-form">
            <div className="relative flex-1" id="tracker-search-input-wrapper">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                placeholder="Ingresar Código de Seguimiento (DD-XXXX)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold tracking-wider text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono uppercase"
                id="tracker-text-input"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/15"
              id="tracker-submit-btn"
            >
              Consultar
            </button>
          </form>

          {searchFailed && (
            <div className="mt-3 bg-rose-500/10 text-rose-200 p-4 rounded-2xl text-xs flex gap-2.5 items-start border border-rose-500/20" id="tracker-error-alert">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-black mb-0.5 text-rose-100">ID no registrado</strong>
                <p className="leading-relaxed text-gray-300">
                  No pudimos localizar ninguna orden bajo el código <strong>{searchId.toUpperCase()}</strong>. Verifica que el formato sea correcto (ejemplo: <strong>DD-8812</strong>) o selecciona uno de los tickets demo rápidos abajo.
                </p>
              </div>
            </div>
          )}

          {/* Quick Demo Preloads */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2" id="demo-triggers">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Demos rápidas:</span>
            {DEMO_TICKETS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectDemo(t)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  queriedTicket?.id === t.id
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400 font-extrabold'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                }`}
                id={`demo-trigger-${t.id}`}
              >
                {t.id} ({t.status === 'reparando' ? 'En Reparación' : t.status === 'listo' ? 'Listo' : 'Diagnóstico'})
              </button>
            ))}
          </div>
        </div>

        {/* Live Status Tracker Main Layout */}
        {queriedTicket ? (
          <div className="bg-[#111111]/90 rounded-3xl p-6 sm:p-8 border border-white/10 max-w-5xl mx-auto shadow-2xl" id="tracking-card">
            
            {/* Header details */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-white/10 gap-4" id="tcard-details-header">
              <div id="tcard-dh-left">
                <span className="text-[10px] font-black uppercase text-blue-450 bg-blue-500/10 border border-blue-500/25 px-2.5 py-1 rounded-md mb-2 inline-block text-blue-400">
                  Orden Localizada: {queriedTicket.id}
                </span>
                <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-500" />
                  {queriedTicket.deviceBrand} {queriedTicket.deviceModel}
                </h3>
                <p className="text-xs text-gray-450 mt-1">
                  <strong>Servicio:</strong> {queriedTicket.damageType} | <strong>Ingresado:</strong> {queriedTicket.date}
                </p>
              </div>

              <div className="sm:text-right" id="tcard-dh-right">
                <span className="text-xs text-gray-500 block font-black uppercase tracking-wider leading-none">Presupuesto Estimado</span>
                <span className="text-2xl font-black text-blue-400 inline-block mt-1">
                  ${queriedTicket.estimatedCost} USD
                </span>
                <span className="text-[10px] bg-white/5 border border-white/10 text-white rounded-md px-2 py-1.5 block mt-2 font-black uppercase tracking-wider" id="est-time-tcard">
                  Reparación: {queriedTicket.estimatedTime}
                </span>
              </div>
            </div>

            {/* Stepper Progress Gauge list */}
            <div className="py-10" id="tracker-stepper">
              <div className="relative" id="stepper-track-layout">
                {/* Horizontal central line for desktop */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden lg:block" id="stepper-line" />
                
                {/* Filled line based on active progress */}
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 hidden lg:block transition-all duration-500" 
                  style={{ width: `${(currentStatusIndex / (steps.length - 1)) * 100}%` }}
                  id="stepper-fill-line"
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10" id="stepper-steps-wrapper">
                  {steps.map((st, sIdx) => {
                    const isCompleted = sIdx < currentStatusIndex;
                    const isActive = sIdx === currentStatusIndex;
                    const isPending = sIdx > currentStatusIndex;

                    return (
                      <div 
                        key={st.key}
                        className={`flex lg:flex-col items-center lg:text-center text-left gap-4 lg:gap-3 transition-opacity ${
                          isPending ? 'opacity-40' : 'opacity-100'
                        }`}
                        id={`stepper-step-${st.key}`}
                      >
                        {/* Circle Indicator */}
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-blue-600 border-[#111111] text-white shadow shadow-blue-500/20' 
                              : isActive 
                                ? 'bg-blue-500 border-[#111111] text-white scale-110 shadow-lg ring-4 ring-blue-500/20 font-black' 
                                : 'bg-white/5 border-white/10 text-gray-500'
                          }`}
                          id={`step-circle-${st.key}`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 fill-current text-white shrink-0" />
                          ) : isActive ? (
                            <Wrench className="w-4 h-4 text-white shrink-0" />
                          ) : (
                            <span className="text-xs font-bold">{sIdx + 1}</span>
                          )}
                        </div>

                        {/* Step titles details */}
                        <div id={`step-meta-${st.key}`}>
                          <h4 className={`text-xs uppercase tracking-wider font-extrabold block ${
                            isActive ? 'text-blue-400 font-black' : isCompleted ? 'text-blue-400 font-bold' : 'text-gray-400'
                          }`}>
                            {st.label}
                          </h4>
                          <p className="text-[11px] text-gray-500 mt-0.5 max-w-[150px] leading-tight font-medium lg:mx-auto">
                            {st.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Detailed Activity Logs */}
            <div className="bg-black border border-white/10 p-5 rounded-2xl" id="tracking-logs-block">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-white flex items-center gap-2 mb-4" id="logs-title">
                <FileCheck className="w-4 h-4 text-blue-500" />
                Bitácora de Trabajo & Reportes Técnicos
              </h4>

              <div className="space-y-4" id="logs-list">
                {queriedTicket.statusHistory.map((hist, hIdx) => (
                  <div key={hIdx} className="relative pl-6 pb-4 border-l-2 border-white/10 last:border-0 last:pb-0" id={`log-item-${hIdx}`}>
                    {/* Circle bulb */}
                    <div className="absolute top-1 -left-1.5 w-3 h-3 rounded-full bg-white/10 border-2 border-[#111111]" id={`log-bullet-${hIdx}`} />
                    
                    <div id={`log-text-${hIdx}`}>
                      <span className="text-[10px] text-gray-500 font-bold font-mono">{hist.timestamp}</span>
                      <p className="text-xs font-medium text-gray-200 mt-0.5">{hist.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick alert instructions */}
            <div className="mt-6 bg-blue-600/10 border border-blue-500/10 text-white rounded-2xl p-5" id="tracker-notice">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" id="notice-row">
                <div id="notice-msg">
                  <h5 className="text-xs font-black uppercase text-blue-400 tracking-wider">Instrucciones de Retiro</h5>
                  <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                    Si el estado de tu equipo figura como <strong>"Listo para Retirar"</strong>, puedes presentarte de forma directa. No necesitas pedir turno previo. Recuerda traer el código del ticket físico o digital y una identificación.
                  </p>
                </div>
                {queriedTicket.status === 'listo' ? (
                  <div className="bg-blue-600 text-white text-xs font-black px-4.5 py-2.5 rounded-xl shrink-0 text-center uppercase tracking-wider shadow-lg shadow-blue-500/15" id="notice-ready-pill">
                    📦 Listo para Retiro
                  </div>
                ) : (
                  <div className="bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-black px-4.5 py-2.5 rounded-xl shrink-0 text-center uppercase tracking-wider animate-pulse" id="notice-repairing-pill">
                    🛠️ En Proceso Clínico
                  </div>
                )}
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-16 bg-[#111111]/90 rounded-3xl border border-dashed border-white/10 max-w-xl mx-auto px-4 shadow-xl" id="tracker-empty">
            <ClipboardList className="w-12 h-12 text-gray-550 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Consulta una Orden Activa</h3>
            <p className="text-gray-400 text-xs max-w-sm mx-auto mt-1 leading-relaxed">
              Ingresa el código que te brindamos al registrar tu equipo en mostrador o genera un turno rápido en la sección de servicio técnico para ver tu progreso.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
