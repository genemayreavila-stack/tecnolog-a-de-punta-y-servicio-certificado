/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'celulares' | 'accesorios';
  subCategory: string;
  price: number;
  originalPrice?: number;
  description: string;
  specs: string[];
  image: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  colors: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export type RepairStatus = 'recibido' | 'diagnostico' | 'reparando' | 'calidad' | 'listo';

export interface RepairTicket {
  id: string;
  customerName: string;
  customerPhone: string;
  deviceBrand: string;
  deviceModel: string;
  damageType: string;
  estimatedCost: number;
  estimatedTime: string;
  status: RepairStatus;
  statusHistory: {
    status: RepairStatus;
    timestamp: string;
    description: string;
  }[];
  date: string;
  notes: string;
}

export interface RepairPriceItem {
  id: string;
  name: string;
  baseCost: number;
  timeEstimate: string;
  description: string;
}

export interface DeviceModelOption {
  name: string;
  priceMultiplier: number; // For newer/higher-end models the repair is slightly more expensive
}

export interface DeviceBrandMeta {
  brand: string;
  models: DeviceModelOption[];
}
