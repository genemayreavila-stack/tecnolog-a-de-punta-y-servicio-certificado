/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CartItem, Product } from '../types';
import { Trash2, ShoppingBag, X, Plus, Minus, ArrowRight, Ticket, Calendar, MapPin, Check, Info } from 'lucide-react';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, color: string, newQty: number) => void;
  onRemoveItem: (productId: string, color: string) => void;
  onClearCart: () => void;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: ShoppingCartProps) {
  // Checkout flow state
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [deliveryType, setDeliveryType] = useState<'retiro' | 'envio'>('retiro');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'transferencia' | 'tarjeta'>('transferencia');
  
  // Completed Order State
  const [orderReceipt, setOrderReceipt] = useState<{
    id: string;
    items: CartItem[];
    subtotal: number;
    discount: number;
    deliveryFee: number;
    total: number;
    date: string;
  } | null>(null);

  // Cart subtotal mathematics
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  }, [cartItems]);

  // If cash/transfer payment, apply 10% discount
  const paymentDiscount = useMemo(() => {
    if (paymentMethod === 'transferencia' && cartSubtotal > 0) {
      return Math.round(cartSubtotal * 0.10);
    }
    return 0;
  }, [paymentMethod, cartSubtotal]);

  const deliveryCost = useMemo(() => {
    if (deliveryType === 'envio' && cartSubtotal > 0) {
      return 15; // standard express courier
    }
    return 0;
  }, [deliveryType, cartSubtotal]);

  const cartTotal = useMemo(() => {
    return cartSubtotal - paymentDiscount + deliveryCost;
  }, [cartSubtotal, paymentDiscount, deliveryCost]);

  const handleCheckoutCompleted = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() === '' || whatsapp.trim() === '') {
      alert('Por favor, completa tus datos de contacto básicos.');
      return;
    }
    if (deliveryType === 'envio' && address.trim() === '') {
      alert('Ingresa la dirección de envío para coordinar el despacho.');
      return;
    }

    const receiptId = `DD-PED-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    setOrderReceipt({
      id: receiptId,
      items: [...cartItems],
      subtotal: cartSubtotal,
      discount: paymentDiscount,
      deliveryFee: deliveryCost,
      total: cartTotal,
      date: dateStr
    });

    onClearCart();
    setIsCheckoutMode(false);
  };

  const handleCloseReceiptView = () => {
    setOrderReceipt(null);
    onClose();
  };

  // WhatsApp automated dispatcher logic
  const triggerWhatsAppRedirection = () => {
    if (!orderReceipt) return;
    
    let text = `*DeDicada Celulares & Servicio Técnico*\n`;
    text += `¡Hola! Acabo de realizar un pedido en su tienda virtual:\n\n`;
    text += `*Orden:* ${orderReceipt.id}\n`;
    text += `*Cliente:* ${fullName}\n`;
    text += `*WhatsApp:* ${whatsapp}\n`;
    text += `*Entrega:* ${deliveryType === 'retiro' ? 'Retiro en Sucursal' : 'Envio Express a: ' + address}\n`;
    text += `*Método de Pago:* ${paymentMethod === 'transferencia' ? 'Transferencia (10% Desc)' : 'Tarjeta de Crédito'}\n\n`;
    text += `*Artículos:*\n`;
    
    orderReceipt.items.forEach((item) => {
      text += `- ${item.quantity}x ${item.product.name} [Color: ${item.selectedColor}] ($${item.product.price} USD c/u)\n`;
    });

    text += `\n*Subtotal:* $${orderReceipt.subtotal} USD`;
    if (orderReceipt.discount > 0) text += `\n*Descuento (10%):* -$${orderReceipt.discount} USD`;
    if (orderReceipt.deliveryFee > 0) text += `\n*Costo Envío:* +$${orderReceipt.deliveryFee} USD`;
    text += `\n*TOTAL A PAGAR:* *$${orderReceipt.total} USD*`;
    text += `\n\n_Por favor, facilítenme los datos de pago para finalizar el envío._`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/15557322824?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="shopping-cart-drawer">
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
        id="cart-backdrop"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10" id="cart-drawer-container">
        <div className="w-screen max-w-md bg-[#111111] border-l border-white/10 shadow-2xl flex flex-col justify-between text-white" id="cart-drawer-sheet">
          
          {/* Header wrapper */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between" id="cart-header">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
              {orderReceipt ? 'Pedido Procesado' : isCheckoutMode ? 'Detalle de Factura' : 'Tu Carrito'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              id="cart-header-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Body area */}
          <div className="flex-1 overflow-y-auto p-6" id="cart-drawer-body">
            
            {orderReceipt ? (
              /* Scenario A: Receipt Success Order view */
              <div className="space-y-6 text-center py-4" id="receipt-success-view">
                <div className="w-14 h-14 bg-blue-600/15 rounded-full flex items-center justify-center text-blue-400 mx-auto border border-blue-500/10" id="receipt-success-icon">
                  <Check className="w-7 h-7" />
                </div>
                
                <div>
                  <h4 className="text-lg font-extrabold text-white uppercase tracking-wider">¡Pedido Pre-Registrado!</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Tu reservación de inventario con ID <strong className="text-blue-400 font-bold">{orderReceipt.id}</strong> ha sido creada.
                  </p>
                </div>

                {/* Simulated physical ticket */}
                <div className="bg-black p-5 rounded-2xl border border-white/10 text-left space-y-4" id="receipt-ticket">
                  <div className="flex justify-between text-[11px] font-bold text-gray-400 font-mono" id="receipt-ticket-meta">
                    <span>TICKET FACTURA #</span>
                    <span>{orderReceipt.date}</span>
                  </div>
                  
                  <div className="border-t border-dashed border-white/10 pt-3" id="receipt-ticket-id">
                    <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wide">ID del Pedido</span>
                    <span className="text-base font-mono font-extrabold text-white">{orderReceipt.id}</span>
                  </div>

                  {/* Summary lists bought */}
                  <div className="space-y-2 border-t border-dashed border-white/10 pt-3" id="receipt-ticket-items">
                    {orderReceipt.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-gray-300" id={`receipt-item-${idx}`}>
                        <span className="font-semibold text-gray-200">{item.quantity}x {item.product.name} ({item.selectedColor})</span>
                        <span className="font-bold text-white">${item.product.price * item.quantity} USD</span>
                      </div>
                    ))}
                  </div>

                  {/* Accounting rows */}
                  <div className="border-t border-white/10 pt-3 text-xs space-y-1.5" id="receipt-ticket-math">
                    <div className="flex justify-between text-gray-400" id="receipt-math-sub">
                      <span>Subtotal de Artículos:</span>
                      <span className="text-white font-medium">${orderReceipt.subtotal} USD</span>
                    </div>
                    {orderReceipt.discount > 0 && (
                      <div className="flex justify-between text-blue-400 font-bold" id="receipt-math-disc">
                        <span>Descuento Especial (10%):</span>
                        <span>-${orderReceipt.discount} USD</span>
                      </div>
                    )}
                    {orderReceipt.deliveryFee > 0 && (
                      <div className="flex justify-between text-gray-400" id="receipt-math-del">
                        <span>Costo de Envío Express:</span>
                        <span className="text-white">+${orderReceipt.deliveryFee} USD</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-white pt-2.5 border-t border-white/5" id="receipt-math-total">
                      <span className="text-white font-extrabold uppercase tracking-wider text-xs">Monto Total Neto:</span>
                      <span className="text-blue-400 text-base font-black">${orderReceipt.total} USD</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600/10 rounded-2xl p-4 text-xs text-blue-300 border border-blue-500/10 text-left flex gap-3" id="receipt-instruction-card">
                  <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block mb-0.5 text-blue-200 uppercase tracking-wide">Finaliza tu Compra vía WhatsApp</span>
                    <p className="leading-relaxed text-gray-300">
                      Envía un WhatsApp para que un asesor te comparta los datos de la cuenta de transferencia o procese tu pago con tarjeta de crédito de inmediato. Aseguramos tu stock por 24 horas.
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4" id="receipt-actions-group">
                  <button
                    onClick={triggerWhatsAppRedirection}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold py-3.5 rounded-2xl shadow-lg hover:shadow-emerald-500/15 cursor-pointer text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
                    id="trigger-whatsapp-btn"
                  >
                    Enviar Pedido a WhatsApp
                  </button>
                  <button
                    onClick={handleCloseReceiptView}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-bold py-3 rounded-2xl text-xs cursor-pointer transition-colors"
                    id="receipt-done-btn"
                  >
                    Cerrar Ticket y Volver
                  </button>
                </div>
              </div>
            ) : isCheckoutMode ? (
              /* Scenario B: Checkout Fields Form */
              <form onSubmit={handleCheckoutCompleted} className="space-y-5" id="checkout-form">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Completa tu Orden</h4>
                  <p className="text-gray-400 text-xs text-left leading-relaxed mt-1">
                    Completa la información básica de despacho. Guardaremos tus teléfonos móviles y carcasas. Pagas al retirar o recibir.
                  </p>
                </div>

                {/* Full name input */}
                <div id="cf-fullname-box">
                  <label className="block text-[10px] font-black uppercase text-gray-450 mb-1.5">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej, Valeria Gatti"
                    className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                    id="cf-input-name"
                  />
                </div>

                {/* WhatsApp input */}
                <div id="cf-whatsapp-box">
                  <label className="block text-[10px] font-black uppercase text-gray-450 mb-1.5">Número de Celular (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Ej, +1 555 123 4567"
                    className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                    id="cf-input-whatsapp"
                  />
                </div>

                {/* Delivery tabs Selection */}
                <div id="cf-delivery-box">
                  <label className="block text-[10px] font-black uppercase text-gray-450 mb-1.5">Tipo de Entrega</label>
                  <div className="grid grid-cols-2 gap-2" id="cf-delivery-pills">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('retiro')}
                      className={`p-3 rounded-xl border text-center font-bold text-xs cursor-pointer flex flex-col gap-1 items-center justify-center transition-all ${
                        deliveryType === 'retiro'
                          ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                          : 'bg-white/5 border border-white/10 text-gray-300'
                      }`}
                      id="cf-del-retiro"
                    >
                      <MapPin className="w-4 h-4 shrink-0 text-white" />
                      Retiro en Tienda (Gratis)
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setDeliveryType('envio')}
                      className={`p-3 rounded-xl border text-center font-bold text-xs cursor-pointer flex flex-col gap-1 items-center justify-center transition-all ${
                        deliveryType === 'envio'
                          ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                          : 'bg-white/5 border border-white/10 text-gray-300'
                      }`}
                      id="cf-del-envio"
                    >
                      <ShoppingBag className="w-4 h-4 shrink-0 text-white" />
                      Envío Express ($15 USD)
                    </button>
                  </div>
                </div>

                {/* Conditional Address Input */}
                {deliveryType === 'envio' && (
                  <div className="animate-in fade-in" id="cf-address-box">
                    <label className="block text-[10px] font-black uppercase text-gray-450 mb-1.5">Dirección de Despacho Completa</label>
                    <textarea
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle, Número, Edificio, Departamento o punto de referencia..."
                      rows={2.5}
                      className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                      id="cf-textarea-address"
                    />
                  </div>
                )}

                {/* Payment mechanisms selection */}
                <div id="cf-payment-box">
                  <label className="block text-[10px] font-black uppercase text-gray-450 mb-1.5">Método de Pago Preferido</label>
                  <div className="grid grid-cols-2 gap-2" id="cf-payment-pills">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transferencia')}
                      className={`p-3 rounded-xl border text-center font-bold text-xs cursor-pointer flex flex-col gap-1 items-center justify-center transition-all ${
                        paymentMethod === 'transferencia'
                          ? 'bg-blue-600/10 border-blue-500 text-white ring-2 ring-blue-500/20'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                      }`}
                      id="cf-pay-trans"
                    >
                      <Ticket className="w-4 h-4 shrink-0" />
                      <span>Efectivo / Transfer</span>
                      <span className="text-[9px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 rounded-full uppercase mt-1 inline-block">
                        10% Descuento
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('tarjeta')}
                      className={`p-3 rounded-xl border text-center font-bold text-xs cursor-pointer flex flex-col gap-1 items-center justify-center transition-all ${
                        paymentMethod === 'tarjeta'
                          ? 'bg-blue-600/10 border-blue-500 text-white shadow-sm ring-2 ring-blue-500/20'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                      id="cf-pay-tarjeta"
                    >
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>Tarjeta de Crédito</span>
                      <span className="text-[9px] text-gray-500 mt-1 block">Pasarela en Línea</span>
                    </button>
                  </div>
                </div>

                {/* Back to editing cart */}
                <button
                  type="button"
                  onClick={() => setIsCheckoutMode(false)}
                  className="text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer block mt-2 text-center underline pb-2"
                  id="checkout-back-edit-btn"
                >
                  Regresar a modificar mi Carrito
                </button>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-2xl shadow-xl hover:shadow-blue-500/10 cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                  id="submit-checkout-btn"
                >
                  Finalizar Reserva de Pedido
                </button>
              </form>
            ) : cartItems.length === 0 ? (
              /* Scenario C: Empty Cart states */
              <div className="text-center py-20" id="cart-empty-view">
                <ShoppingBag className="w-14 h-14 text-white/10 mx-auto mb-4 animate-bounce" />
                <h4 className="text-base font-bold text-white uppercase tracking-wider mb-1">Tu carrito está vacío</h4>
                <p className="text-gray-400 text-xs max-w-[240px] mx-auto leading-relaxed">
                  Visita nuestro catálogo y elige los celulares o accesorios que desees comprar.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 font-extrabold text-xs text-white uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-500/15"
                  id="cart-empty-close-btn"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              /* Scenario D: Listed cart items state */
              <div className="space-y-4" id="cart-items-list-view">
                <p className="text-xs text-gray-450 tracking-wider text-left mb-2">
                  Artículos agregados para reservación:
                </p>
                
                {cartItems.map((item, index) => (
                  <div 
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="flex gap-4 p-3 bg-white/5 border border-white/10 rounded-2xl relative group items-center"
                    id={`cart-item-row-${item.product.id}-${item.selectedColor}`}
                  >
                    {/* Compact Item thumbnail image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-black border border-white/10 shrink-0" id={`cart-row-img-box-${index}`}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        id={`cart-item-img-${index}`}
                      />
                    </div>

                    {/* Meta info columns */}
                    <div className="flex-1" id={`cart-row-info-box-${index}`}>
                      <div className="flex justify-between items-start" id={`cart-row-title-row-${index}`}>
                        <h4 className="font-bold text-xs text-white line-clamp-1 pr-4" id={`cart-item-name-${index}`}>
                          {item.product.name}
                        </h4>
                        
                        {/* Remove trash item */}
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                          className="p-1 rounded-full text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors inline-block cursor-pointer"
                          title="Remover artículo"
                          id={`cart-item-remove-btn-${index}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-0.5" id={`cart-item-spec-${index}`}>
                        Color: {item.selectedColor}
                      </span>

                      {/* Quantity sliders bar & pricing displays */}
                      <div className="flex justify-between items-center mt-2.5" id={`cart-row-counter-row-${index}`}>
                        {/* +/- counter */}
                        <div className="flex bg-white/5 rounded-lg p-0.5 items-center border border-white/10 shadow-sm" id={`cart-row-counter-${index}`}>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                            className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors font-semibold cursor-pointer text-xs"
                            id={`cart-row-minus-${index}`}
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-[11px] font-black text-white" id={`cart-row-qty-${index}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                            className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors font-semibold cursor-pointer text-xs"
                            id={`cart-row-plus-${index}`}
                          >
                            +
                          </button>
                        </div>

                        {/* Row Price total */}
                        <strong className="text-xs font-black text-white" id={`cart-row-pricing-${index}`}>
                          ${(item.product.price * item.quantity).toLocaleString()} USD
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Bottom Billing summaries/checkouts (Only when not in success mode) */}
          {!orderReceipt && cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black space-y-4" id="cart-drawer-footer">
              
              {/* Invoice Calculations summaries */}
              <div className="space-y-2 text-xs text-gray-450" id="cart-totals-sheet">
                <div className="flex justify-between" id="invoice-r-sub">
                  <span className="text-gray-400">Subtotal de Artículos:</span>
                  <span className="font-bold text-white">${cartSubtotal} USD</span>
                </div>
                {paymentDiscount > 0 && (
                  <div className="flex justify-between text-blue-400 font-bold" id="invoice-r-disc">
                    <span>Descuento de Pago (-10%):</span>
                    <span>-${paymentDiscount} USD</span>
                  </div>
                )}
                {deliveryCost > 0 && (
                  <div className="flex justify-between text-gray-400" id="invoice-r-del">
                    <span>Costo de Envío Express:</span>
                    <span className="text-white font-medium">+${deliveryCost} USD</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-3 border-t border-white/10" id="invoice-r-total">
                  <span>Monto Total Estimado:</span>
                  <span className="text-blue-400 font-extrabold text-base">${cartTotal} USD</span>
                </div>
              </div>

              {/* Dynamic instruction banners */}
              {isCheckoutMode ? null : (
                <div className="flex gap-2 bg-[#1a2e40] border border-blue-500/20 p-2.5 rounded-xl text-[10.5px] text-blue-300" id="cart-cash-promotion-badge">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p>
                    Ahorra un <strong className="text-white">10% EXTRA</strong> si eliges pago por Transferencia Bancaria o Efectivo directo en tienda durante el Checkout.
                  </p>
                </div>
              )}

              {/* CTA switches action */}
              {isCheckoutMode ? null : (
                <button
                  onClick={() => setIsCheckoutMode(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-2xl shadow-xl hover:shadow-blue-500/20 cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
                  id="checkout-proceed-btn"
                >
                  Proceder al Checkout
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
