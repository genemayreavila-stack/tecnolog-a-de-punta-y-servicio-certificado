/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { RepairTicket, RepairPriceItem, DeviceBrandMeta, RepairStatus } from '../types';
import { REPAIR_SERVICES, BRANDS_METADATA } from '../data';
import { Wrench, ShieldCheck, Clock, Settings, ArrowRight, User, Phone, CheckCircle2, AlertCircle, Copy, HelpCircle } from 'lucide-react';

interface RepairServiceProps {
  onAddRepairTicket: (ticket: RepairTicket) => void;
  onNavigateToTracker: () => void;
}

export default function RepairService({ onAddRepairTicket, onNavigateToTracker }: RepairServiceProps) {
  // Brand selection
  const [selectedBrand, setSelectedBrand] = useState<string>('Apple');
  // Model selection (defaults to first model of chosen brand)
  const [selectedModel, setSelectedModel] = useState<string>('iPhone 15 Pro Max');
  // Service type
  const [selectedServiceId, setSelectedServiceId] = useState<string>(REPAIR_SERVICES[0].id);

  // Booking customer details form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [createdTicket, setCreatedTicket] = useState<RepairTicket | null>(null);
  const [validationError, setValidationError] = useState('');
  const [copied, setCopied] = useState(false);

  // Update selected model when brand changes
  const brandData = useMemo(() => {
    const data = BRANDS_METADATA.find(b => b.brand === selectedBrand);
    if (data && data.models.length > 0) {
      // If previous model is not in new brand, reset model to first option
      const modelExists = data.models.some(m => m.name === selectedModel);
      if (!modelExists) {
        setSelectedModel(data.models[0].name);
      }
    }
    return data;
  }, [selectedBrand]);

  const activeModelMeta = useMemo(() => {
    if (!brandData) return { name: '', priceMultiplier: 1.0 };
    return brandData.models.find(m => m.name === selectedModel) || brandData.models[0];
  }, [brandData, selectedModel]);

  const activeServiceMeta = useMemo(() => {
    return REPAIR_SERVICES.find(s => s.id === selectedServiceId) || REPAIR_SERVICES[0];
  }, [selectedServiceId]);

  // Real calculation formula: Base cost of service * model tier multiplier
  const estimatedTotalCost = useMemo(() => {
    const cost = activeServiceMeta.baseCost * activeModelMeta.priceMultiplier;
    return Math.round(cost); // return rounded integer for clarity
  }, [activeServiceMeta, activeModelMeta]);

  const handleBookTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (customerName.trim() === '') {
      setValidationError('Por favor ingresa tu nombre completo.');
      return;
    }
    if (customerPhone.trim() === '' || customerPhone.length < 7) {
      setValidationError('Ingresa un número telefónico de contacto válido para dar avisos.');
      return;
    }

    const ticketId = `DD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    const newTicket: RepairTicket = {
      id: ticketId,
      customerName: customerName,
      customerPhone: customerPhone,
      deviceBrand: selectedBrand,
      deviceModel: selectedModel,
      damageType: activeServiceMeta.name,
      estimatedCost: estimatedTotalCost,
      estimatedTime: activeServiceMeta.timeEstimate,
      status: 'recibido',
      statusHistory: [
        {
          status: 'recibido',
          timestamp: `${dateStr} a las ${timeStr}`,
          description: 'Solicitud de servicio técnico registrada mediante portal web.'
        }
      ],
      date: dateStr,
      notes: customNotes.trim() === '' ? 'Sin comentarios adicionales.' : customNotes
    };

    onAddRepairTicket(newTicket);
    setCreatedTicket(newTicket);
    setIsSubmitSuccess(true);
    
    // Clear form inputs
    setCustomerName('');
    setCustomerPhone('');
    setCustomNotes('');
  };

  const copyTicketId = () => {
    if (createdTicket) {
      navigator.clipboard.writeText(createdTicket.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="py-12 bg-[#0A0A0A] text-white" id="repair-support-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clinica de reparaciones intro */}
        <div className="text-center max-w-3xl mx-auto mb-12" id="repair-intro">
          <span className="text-xs font-black uppercase text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full inline-block mb-4" id="intro-subtitle">
            SOPORTE TÉCNICO AL INSTANTE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-widest uppercase" id="intro-title">
            Laboratorio de Reparación Certificado
          </h2>
          <p className="text-gray-400 font-medium text-sm sm:text-base mt-2" id="intro-desc">
            No abandones tu celular por días. En <strong className="text-white">DeDicada</strong> realizamos diagnósticos avanzados, cambios de módulos, baterías de alta salud y reparaciones complejas de placas con instrumental clínico certificado.
          </p>
        </div>

        {/* Confidence pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" id="repair-pillars">
          <div className="bg-[#111111]/90 p-6 rounded-2xl border border-white/10 flex items-start gap-4 shadow-xl hover:border-white/20 transition-all" id="pillar-tech">
            <div className="p-3 bg-white/5 rounded-xl text-blue-500 shrink-0">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Especialistas Nivel III</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Técnicos certificados con microscopio para soldaduras SMD en micro-componentes de placas.
              </p>
            </div>
          </div>

          <div className="bg-[#111111]/90 p-6 rounded-2xl border border-white/10 flex items-start gap-4 shadow-xl hover:border-white/20 transition-all" id="pillar-express">
            <div className="p-3 bg-white/5 rounded-xl text-blue-500 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Servicio Express</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Reemplazos de pantallas, pines y baterías hechos en menos de 1 hora previa cita registrada.
              </p>
            </div>
          </div>

          <div className="bg-[#111111]/90 p-6 rounded-2xl border border-white/10 flex items-start gap-4 shadow-xl hover:border-white/20 transition-all" id="pillar-guarantee">
            <div className="p-3 bg-white/5 rounded-xl text-blue-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Garantía Certificada</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Todas nuestras reparaciones de hardware cuentan con 6 meses de garantía legal por escrito.
              </p>
            </div>
          </div>

          <div className="bg-[#111111]/90 p-6 rounded-2xl border border-white/10 flex items-start gap-4 shadow-xl hover:border-white/20 transition-all" id="pillar-parts">
            <div className="p-3 bg-white/5 rounded-xl text-blue-500 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Insumos AAA / OEM</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Solo empleamos componentes originales (OEM) o repuestos clase premium autorizados en pruebas.
              </p>
            </div>
          </div>
        </div>

        {/* Live Estimator & Scheduler widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="estimator-block">
          
          {/* Column 1: Live price simulator selector (8 cols) */}
          <div className="lg:col-span-7 bg-[#111111]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between text-white" id="estimator-widget">
            <div id="calculator-section">
              <div className="flex items-center gap-2 mb-6" id="calc-headline">
                <span className="p-1.5 bg-blue-600 text-white rounded-lg">
                  <Wrench className="w-4 h-4" />
                </span>
                <h3 className="text-lg font-black text-white uppercase tracking-wider">
                  Simulador de Presupuestos en Tiempo Real
                </h3>
              </div>

              <div className="space-y-5" id="form-selections">
                {/* Brand Selector */}
                <div id="brand-select-box">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-450 mb-2">
                    1. Marca del Dispositivo
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" id="brand-tiles">
                    {BRANDS_METADATA.map((b) => {
                      const isSelected = selectedBrand === b.brand;
                      return (
                        <button
                          key={b.brand}
                          onClick={() => setSelectedBrand(b.brand)}
                          className={`py-3 px-4 rounded-xl border text-sm font-bold text-center cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/15 hover:border-white/20 text-gray-350 hover:bg-white/5 text-gray-300'
                          }`}
                          id={`brand-tile-${b.brand}`}
                        >
                          {b.brand}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Model Selector */}
                <div id="model-select-box">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-450 mb-2">
                    2. Modelo Exacto
                  </label>
                  <div className="relative" id="model-dropdown-area">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-[#1C1C1E] border border-white/10 shadow-sm text-gray-300 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                      id="device-model-selector"
                    >
                      {brandData?.models.map((m) => (
                        <option key={m.name} value={m.name} className="bg-[#1C1C1E]">
                          {m.name} {m.priceMultiplier >= 1.5 ? '(Gama Ultra)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Damage Selector */}
                <div id="damage-select-box">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-450 mb-2">
                    3. Tipo de Reparación / Daño Diagnóstico
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="service-options-grid">
                    {REPAIR_SERVICES.map((serv) => {
                      const isSelected = selectedServiceId === serv.id;
                      // Dynamic calculation for tile badge preview
                      const pricingPreview = Math.round(serv.baseCost * activeModelMeta.priceMultiplier);
                      return (
                        <button
                          key={serv.id}
                          onClick={() => setSelectedServiceId(serv.id)}
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-blue-650/15 border-blue-550 text-white ring-2 ring-blue-500/20 bg-blue-600/10 border-blue-500'
                              : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                          }`}
                          id={`service-tile-${serv.id}`}
                        >
                          <div>
                            <span className="font-bold text-sm block leading-tight text-white">{serv.name}</span>
                            <span className="text-[10px] text-gray-400 font-medium block mt-1 leading-snug">{serv.description}</span>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5 w-full" id={`service-tile-meta-${serv.id}`}>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-blue-400" />
                              {serv.timeEstimate.split(' ')[0]} h
                            </span>
                            <span className={`text-sm font-extrabold ${isSelected ? 'text-blue-400 font-black' : 'text-white'}`}>
                              ${pricingPreview} USD
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* Calculations summaries display */}
            <div className="mt-8 pt-6 border-t border-white/15 bg-black text-white p-5 rounded-2xl border border-white/10" id="estimator-invoice-preview">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center" id="invoice-details">
                <div id="invoice-est-total">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Presupuesto Estimado</span>
                  <span className="text-2xl font-black text-blue-400 block mt-0.5" id="live-reparation-cost">
                    ${estimatedTotalCost} USD
                  </span>
                  <span className="text-[9px] text-gray-500 block">Presupuesto estimado *Repuestos e IVA incluidos</span>
                </div>
                <div id="invoice-est-time">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Fase de Trabajo</span>
                  <span className="text-sm font-bold text-white block mt-1" id="live-reparation-time">
                    {activeServiceMeta.timeEstimate}
                  </span>
                  <span className="text-[9px] text-[#22c55e] font-semibold block mt-1">Listo hoy</span>
                </div>

                <div className="col-span-2 sm:col-span-1" id="invoice-est-warranty">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Garantía DeDicada</span>
                  <span className="text-sm font-bold text-white block mt-1">
                    6 Meses Escrita
                  </span>
                  <span className="text-[9px] text-gray-400 block mt-1">Fallo integral cubierto</span>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Booking Form/Confirmation card (5 cols) */}
          <div className="lg:col-span-5 flex" id="booking-block">
            <div className="bg-[#111111]/90 rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 w-full flex flex-col justify-between" id="booking-inner text-white">
              
              {!isSubmitSuccess ? (
                // Setup appointment form
                <form onSubmit={handleBookTicket} className="h-full flex flex-col justify-between w-full" id="booking-form">
                  <div className="space-y-4 w-full" id="booking-fields-area">
                    <div id="booking-header">
                      <h4 className="text-base font-black text-white mb-1 uppercase tracking-wider">
                        Reservar Turno Técnico Gratis
                      </h4>
                      <p className="text-xs text-gray-400">
                        Agenda tu turno sin cargo. Trae tu equipo e iniciaremos la reparación de inmediato. No cobramos diagnóstico.
                      </p>
                    </div>

                    {validationError && (
                      <div className="bg-rose-500/10 text-rose-300 p-3 rounded-xl text-xs flex items-center gap-2 border border-rose-500/20" id="booking-validation-alert">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                        <span>{validationError}</span>
                      </div>
                    )}

                    {/* Customer Name */}
                    <div id="bf-customer-name">
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5">Nombre del Dueño</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-450 text-blue-400" />
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Ej, Carlos Rodríguez"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-sans"
                          id="bf-input-name"
                        />
                      </div>
                    </div>

                    {/* Customer Phone */}
                    <div id="bf-customer-phone">
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5">Teléfono de Contacto (WhatsApp)</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-450 text-blue-400" />
                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Ej, +1 555 123 4567"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-sans"
                          id="bf-input-phone"
                        />
                      </div>
                    </div>

                    {/* Extra Notes */}
                    <div id="bf-custom-notes">
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5">Comentarios o Síntomas Adicionales</label>
                      <textarea
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                        placeholder="Ej, El táctil responde mal a ratos o la batería se recalienta en llamada..."
                        rows={3}
                        className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-sans"
                        id="bf-textarea-notes"
                      />
                    </div>

                    {/* Summary badge */}
                    <div className="bg-white/5 p-3.5 rounded-xl space-y-1.5 text-xs text-gray-300 border border-white/5" id="bf-invoice-review">
                      <div className="flex justify-between" id="bf-ir-device">
                        <span>Equipo:</span>
                        <strong className="text-white">{selectedBrand} {selectedModel}</strong>
                      </div>
                      <div className="flex justify-between" id="bf-ir-damage">
                        <span>Servicio:</span>
                        <strong className="text-white line-clamp-1">{activeServiceMeta.name}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-xl shadow-xl shadow-blue-500/10 cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2 mt-6 transition-all hover:-translate-y-0.5"
                    id="submit-booking-button"
                  >
                    Confirmar Turno y Obtener Ticket
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </form>
              ) : (
                // Success booked message!
                <div className="text-center py-6 h-full flex flex-col justify-between items-center" id="booking-success-view">
                  <div className="space-y-4 w-full" id="success-header-wrapper">
                    <div className="w-16 h-16 bg-blue-600/15 rounded-full flex items-center justify-center text-blue-400 mx-auto animate-bounce border border-blue-500/10" id="success-icon">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div id="success-headlines">
                      <h4 className="text-lg font-black text-white uppercase tracking-wider">¡Turno Reservado Exitosamente!</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        Tu equipo ha quedado pre-registrado en el laboratorio clínico DeDicada.
                      </p>
                    </div>

                    {createdTicket && (
                      <div className="bg-black p-5 rounded-2xl text-left space-y-3 border border-white/10 relative overflow-hidden" id="booking-success-ticket">
                        <div className="flex justify-between items-center" id="ticket-headline-meta">
                          <span className="text-[10px] text-blue-400 font-extrabold tracking-widest uppercase">TICKET ELECTRÓNICO</span>
                          <span className="text-[10px] text-gray-400 font-medium">{createdTicket.date}</span>
                        </div>
                        
                        <div className="border-t border-dashed border-white/10 pt-3" id="ticket-id-section">
                          <span className="text-[9px] text-gray-500 block uppercase font-bold tracking-wide">Código de Seguimiento</span>
                          <div className="flex items-center justify-between" id="ticket-id-row">
                            <span className="text-xl font-mono font-black text-white tracking-widest" id="ticket-display-id">
                              {createdTicket.id}
                            </span>
                            <button
                              onClick={copyTicketId}
                              className="p-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-white/10"
                              title="Copiar Código"
                              id="ticket-copy-btn"
                            >
                              <Copy className="w-3" />
                              {copied ? '¡Copiado!' : 'Copiar'}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs pt-3 border-t border-white/10 text-gray-300" id="ticket-details-summary">
                          <p><strong className="text-gray-400 font-medium">Cliente:</strong> {createdTicket.customerName}</p>
                          <p><strong className="text-gray-400 font-medium">Dispositivo:</strong> {createdTicket.deviceBrand} {createdTicket.deviceModel}</p>
                          <p><strong className="text-gray-400 font-medium">Falla:</strong> {createdTicket.damageType}</p>
                          <p><strong className="text-gray-400 font-medium">Monto aprox:</strong> <span className="text-blue-400 font-bold">${createdTicket.estimatedCost} USD</span></p>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-600/10 rounded-2xl p-4 text-xs text-blue-300 border border-blue-500/10 text-left flex gap-3" id="booking-success-instructions">
                      <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-black mb-0.5 text-blue-200">Siguientes Pasos:</strong>
                        <p className="leading-relaxed text-gray-300">
                          Acércate a nuestra sucursal (Av. Central 1024) cualquier día laborable con tu celular. Menciona tu código <strong className="text-white">{createdTicket?.id}</strong> en el mostrador. Tu equipo ingresará directo a revisión exprés.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full mt-6" id="success-navigation">
                    <button
                      onClick={onNavigateToTracker}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-blue-500/15 transition-all hover:-translate-y-0.5"
                      id="view-live-tracking-btn"
                    >
                      Ir al Seguidor de Estado en Vivo
                    </button>
                    <button
                      onClick={() => setIsSubmitSuccess(false)}
                      className="w-full bg-transparent hover:bg-white/5 border border-white/10 text-gray-450 hover:text-white font-semibold py-3 rounded-xl text-xs cursor-pointer transition-colors mt-1 text-gray-400"
                      id="book-another-btn"
                    >
                      Generar otro Turno Técnico
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
