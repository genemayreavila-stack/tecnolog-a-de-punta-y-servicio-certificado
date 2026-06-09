/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, RepairPriceItem, DeviceBrandMeta } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'celulares',
    subCategory: 'Gama Premium',
    price: 1399,
    originalPrice: 1499,
    description: 'Forjado en titanio de calidad aeroespacial, con el revolucionario chip A17 Pro y un sistema de cámaras superpotente de 120mm.',
    specs: [
      'Pantalla Super Retina XDR OLED de 6.7"',
      'Chip A17 Pro con GPU de 6 núcleos',
      'Cámara principal de 48 MP con zoom óptico 5x',
      'Almacenamiento de 256GB / 512GB / 1TB',
      'Puerto USB-C compatible con USB 3'
    ],
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    stock: 8,
    rating: 4.9,
    reviewsCount: 124,
    isFeatured: true,
    isNew: true,
    colors: ['Titanio Natural', 'Titanio Azul', 'Titanio Negro']
  },
  {
    id: 'p2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'celulares',
    subCategory: 'Gama Premium',
    price: 1249,
    originalPrice: 1349,
    description: 'La nueva era de la Inteligencia Artificial móvil en tus manos. Estructura de titanio, S Pen integrado y sensor de cámara de 200 MP.',
    specs: [
      'Pantalla Dynamic AMOLED 2X de 6.8" 120Hz',
      'Procesador Snapdragon 8 Gen 3 for Galaxy',
      'Cámara de 200 MP + Gran Angular + Teleobjetivo',
      'Batería de 5000 mAh con carga súper rápida',
      'S Pen inteligente integrado con latencia de 2.8ms'
    ],
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    stock: 12,
    rating: 4.8,
    reviewsCount: 98,
    isFeatured: true,
    colors: ['Gris Titanio', 'Negro Titanio', 'Violeta Titanio']
  },
  {
    id: 'p3',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    category: 'celulares',
    subCategory: 'Gama Premium',
    price: 1099,
    description: 'Co-diseñado con Leica. Sensor óptico premium de 1 pulgada y un sistema fotográfico cuádruple de nivel profesional con apertura variable.',
    specs: [
      'Pantalla AMOLED de 6.73" WQHD+ 120Hz',
      'Procesador Snapdragon 8 Gen 3',
      'Cámara cuádruple Leica de 50 MP con sensor de 1"',
      'Carga turbo por cable de 90W e inalámbrica de 80W',
      'Resistencia al agua y al polvo IP68'
    ],
    image: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=600&auto=format&fit=crop&q=80',
    stock: 5,
    rating: 4.7,
    reviewsCount: 43,
    isNew: true,
    colors: ['Negro Elegante', 'Blanco Cerámico']
  },
  {
    id: 'p4',
    name: 'iPhone 15',
    brand: 'Apple',
    category: 'celulares',
    subCategory: 'Gama Alta',
    price: 899,
    originalPrice: 949,
    description: 'Cuenta con Dynamic Island, cámara principal de 48 MP y vidrio teñido en masa con un diseño duradero de aluminio de calidad aeroespacial.',
    specs: [
      'Pantalla Super Retina XDR OLED de 6.1"',
      'Chip A16 Bionic de alto rendimiento',
      'Cámara de 48 MP con teleobjetivo virtual de 2x',
      'Dynamic Island inteligente',
      'Puerto USB-C universal'
    ],
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80',
    stock: 15,
    rating: 4.8,
    reviewsCount: 86,
    colors: ['Negro', 'Azul Pastel', 'Verde Pastel']
  },
  {
    id: 'p5',
    name: 'Samsung Galaxy A55 5G',
    brand: 'Samsung',
    category: 'celulares',
    subCategory: 'Gama Media-Alta',
    price: 439,
    originalPrice: 479,
    description: 'Diseño elegante de vidrio y metal. Fotografías nocturnas espectaculares gracias a Nightography, procesador octa-core optimizado y seguridad certificada.',
    specs: [
      'Pantalla Super AMOLED FHD+ de 6.6" 120Hz',
      'Procesador Exynos 1480 con GPU Xclipse 530',
      'Cámara triple de 50 MP con OIS',
      'Batería gigante de 5000 mAh para 2 días',
      'Protección contra polvo y agua IP67'
    ],
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    stock: 20,
    rating: 4.6,
    reviewsCount: 154,
    colors: ['Iceblue', 'Navy Blue', 'Lilac']
  },
  {
    id: 'p6',
    name: 'Motorola Edge 50 Pro',
    brand: 'Motorola',
    category: 'celulares',
    subCategory: 'Gama Alta',
    price: 649,
    description: 'Curvas sofisticadas y cuero vegano premium. Rendimiento de vanguardia con carga rápida TurboPower de 125W sin precedentes.',
    specs: [
      'Pantalla pOLED curva de 6.7" Super HD 144Hz',
      'Procesador Snapdragon 7 Gen 3',
      'Cámara principal de 50 MP con IA Moto Secure',
      'Carga TurboPower de 125W e inalámbrica de 50W',
      'Acabado elegante en cuero vegano premium'
    ],
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80',
    stock: 7,
    rating: 4.7,
    reviewsCount: 31,
    colors: ['Negro Eclipse', 'Lavanda Premium']
  },
  {
    id: 'p7',
    name: 'AirPods Pro (2.ª Generación)',
    brand: 'Apple',
    category: 'accesorios',
    subCategory: 'Audio',
    price: 249,
    originalPrice: 279,
    description: 'Cancelación Activa de Ruido hasta dos veces mejor que la generación anterior. Audio espacial adaptativo y estuche USB-C.',
    specs: [
      'Chip H2 de Apple para excelente calidad de sonido',
      'Cancelación Activa de Ruido avanzada',
      'Modo de transigencia adaptativa en tiempo real',
      'Hasta 6 horas de reproducción continua',
      'Estuche MagSafe con bocina y rastreo de ubicación'
    ],
    image: 'https://images.unsplash.com/photo-1588449668338-d13417f16af7?w=600&auto=format&fit=crop&q=80',
    stock: 25,
    rating: 4.9,
    reviewsCount: 215,
    isFeatured: true,
    colors: ['Blanco Puro']
  },
  {
    id: 'p8',
    name: 'Cargador Rápido Anker Prime 67W',
    brand: 'Anker',
    category: 'accesorios',
    subCategory: 'Cargadores y Cables',
    price: 59,
    description: 'Carga tres dispositivos a la vez de forma ultra rápida gracias a la tecnología GaNPrime. Tamaño compacto ideal para viajes.',
    specs: [
      'Tecnología GaN III avanzada de alta eficiencia',
      '2 puertos USB-C y 1 puerto USB-A',
      'Potencia combinada máxima de 67W inteligentes',
      'Sistema de protección de control térmico ActiveShield 2.0',
      'Diseño ultracompacto con pines plegables'
    ],
    image: 'https://images.unsplash.com/photo-1622445262465-2481c85732adf?w=600&auto=format&fit=crop&q=80',
    stock: 40,
    rating: 4.8,
    reviewsCount: 167,
    colors: ['Negro Carbón', 'Gris Platino']
  },
  {
    id: 'p9',
    name: 'Funda Spigen Tough Armor MagSafe',
    brand: 'Spigen',
    category: 'accesorios',
    subCategory: 'Fundas y Protectores',
    price: 35,
    description: 'Protección extrema contra impactos con tecnología Air Cushion de grado militar y anillo magnético integrado para carga inalámbrica.',
    specs: [
      'Certificación militar contra impactos MIL-STD 810G',
      'Tecnología Cushion de espuma de impacto extremo',
      'Anillo magnético MagSafe integrado extra fuerte',
      'Soporte integrado para visualización manos libres',
      'Bordes elevados para máxima protección de pantalla y cámara'
    ],
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
    stock: 50,
    rating: 4.7,
    reviewsCount: 312,
    colors: ['Negro Mate', 'Azul Abismo', 'Gris Metal']
  },
  {
    id: 'p10',
    name: 'Samsung Galaxy Buds2 Pro',
    brand: 'Samsung',
    category: 'accesorios',
    subCategory: 'Audio',
    price: 189,
    originalPrice: 229,
    description: 'Audio de alta fidelidad de 24 bits. Sonido envolvente envolvente de 360 grados y cancelación activa inteligente (ANC) extrema.',
    specs: [
      'Audio inalámbrico Hi-Fi excepcional de 24 bits',
      'Cancelación de Ruido Activa inteligente de 3 micrófonos',
      'Detección de voz que apaga el ANC automáticamente',
      'Resistencia al agua IPX7 para entrenamientos duros',
      'Ajuste ergonómico ultracómodo ventilado'
    ],
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80', // placeholder premium
    stock: 18,
    rating: 4.7,
    reviewsCount: 84,
    colors: ['Grafito', 'Blanco', 'Bora Purple']
  },
  {
    id: 'p11',
    name: 'Soporte de Carga Inalámbrica Belkin 3 en 1',
    brand: 'Belkin',
    category: 'accesorios',
    subCategory: 'Cargadores y Cables',
    price: 119,
    description: 'Carga tu smartphone, reloj inteligente y audífonos inalámbricos de forma simultánea en esta base flotante vanguardista de alta potencia.',
    specs: [
      'Potencia inalámbrica ultra rápida certificada',
      'Compatible con MagSafe de Apple de máxima atracción',
      'Superficies acolchonadas premium anti-deslizamiento',
      'Indicadores LED de nivel de carga discreto',
      'Cargador de pared incluido de alta velocidad'
    ],
    image: 'https://images.unsplash.com/photo-1541140134513-85a161dc4a65?w=600&auto=format&fit=crop&q=80',
    stock: 10,
    rating: 4.8,
    reviewsCount: 52,
    isNew: true,
    colors: ['Blanco Glaciar', 'Negro Obsidiana']
  }
];

export const REPAIR_SERVICES: RepairPriceItem[] = [
  {
    id: 'rep_pany',
    name: 'Cambio de Pantalla (Módulo Completo)',
    baseCost: 80,
    timeEstimate: '45 a 90 minutos (Express)',
    description: 'Reemplazo del cristal roto y panel táctil OLED/LCD por repuestos de máxima calidad con calibración de color original.'
  },
  {
    id: 'rep_bat',
    name: 'Reemplazo de Batería Alta Vida Útil',
    baseCost: 35,
    timeEstimate: '30 a 45 minutos',
    description: 'Reemplazo de la celda de batería degradada por una de salud 100% certificada con reinicio del contador de ciclos de carga.'
  },
  {
    id: 'rep_car',
    name: 'Reparación de Puerto de Carga (Pin USB-C/Lightning)',
    baseCost: 30,
    timeEstimate: '1 a 2 horas',
    description: 'Solución a fallas de conexiones inestables o nulas. Limpieza profesional o cambio de flex de puerto de carga.'
  },
  {
    id: 'rep_cam',
    name: 'Reparación de Cámaras y Cristal Protector',
    baseCost: 45,
    timeEstimate: '1 a 2 horas',
    description: 'Cambio de cristales de cámara estrellados o sustitución de módulos de enfoque dañados tras impactos.'
  },
  {
    id: 'rep_wat',
    name: 'Tratamiento Ultrasónico por Daño de Agua (Humedad)',
    baseCost: 55,
    timeEstimate: '24 horas (Diagnóstico profundo)',
    description: 'Desarmado completo del equipo, secado térmico controlado y limpieza ultrasónica del circuito impreso para remover óxido.'
  },
  {
    id: 'rep_pla',
    name: 'Reparación de Placa Madre (Micro-Soldadura)',
    baseCost: 90,
    timeEstimate: '2 a 5 días hábiles',
    description: 'Diagnósticos complejos de cortocircuitos bajo microscopio, reconstrucción de pistas y soldadura de circuitos integrados (reballing).'
  }
];

export const BRANDS_METADATA: DeviceBrandMeta[] = [
  {
    brand: 'Apple',
    models: [
      { name: 'iPhone 15 Pro Max', priceMultiplier: 1.6 },
      { name: 'iPhone 15 Pro', priceMultiplier: 1.5 },
      { name: 'iPhone 15 / 15 Plus', priceMultiplier: 1.3 },
      { name: 'iPhone 14 Pro / Pro Max', priceMultiplier: 1.4 },
      { name: 'iPhone 14 / 14 Plus', priceMultiplier: 1.2 },
      { name: 'iPhone 13 / 13 Pro', priceMultiplier: 1.1 },
      { name: 'iPhone 12 / 12 Pro', priceMultiplier: 1.0 },
      { name: 'iPhone 11 / 11 Pro', priceMultiplier: 0.9 },
      { name: 'iPhone SE (2020/2022)', priceMultiplier: 0.8 }
    ]
  },
  {
    brand: 'Samsung',
    models: [
      { name: 'Galaxy S24 Ultra', priceMultiplier: 1.6 },
      { name: 'Galaxy S24 / S24+', priceMultiplier: 1.4 },
      { name: 'Galaxy S23 Ultra', priceMultiplier: 1.4 },
      { name: 'Galaxy S23 / S23+', priceMultiplier: 1.2 },
      { name: 'Galaxy S22 Ultra', priceMultiplier: 1.3 },
      { name: 'Galaxy S22 / S22+', priceMultiplier: 1.1 },
      { name: 'Galaxy A55 / A54 5G', priceMultiplier: 0.9 },
      { name: 'Galaxy A35 / A34 5G', priceMultiplier: 0.8 },
      { name: 'Galaxy Z Fold5 / Flip5 (Flexible)', priceMultiplier: 2.2 }
    ]
  },
  {
    brand: 'Xiaomi',
    models: [
      { name: 'Xiaomi 14 Ultra', priceMultiplier: 1.5 },
      { name: 'Xiaomi 14 / 13T', priceMultiplier: 1.2 },
      { name: 'Redmi Note 13 Pro+ 5G', priceMultiplier: 0.9 },
      { name: 'Redmi Note 13 Pro', priceMultiplier: 0.8 },
      { name: 'Redmi Note 12 / 12S', priceMultiplier: 0.7 },
      { name: 'POCO F6 Pro / F5', priceMultiplier: 1.0 },
      { name: 'POCO X6 Pro / M6', priceMultiplier: 0.8 }
    ]
  },
  {
    brand: 'Motorola',
    models: [
      { name: 'Edge 50 Ultra / Pro', priceMultiplier: 1.3 },
      { name: 'Edge 40 / 40 Neo', priceMultiplier: 1.1 },
      { name: 'Moto G85 / G54 5G', priceMultiplier: 0.8 },
      { name: 'Moto G24 / G14', priceMultiplier: 0.7 },
      { name: 'Razr 40 Ultra (Flexible)', priceMultiplier: 1.9 }
    ]
  }
];
