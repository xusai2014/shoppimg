export type Sku = {
  id: string;
  label: { zh: string; en: string };
  priceDelta: number;
  stock: number;
};

export type Product = {
  id: string;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  category: { zh: string; en: string };
  basePrice: number;
  rating: number;
  reviews: number;
  gradient: string;
  emoji: string;
  tags: { zh: string[]; en: string[] };
  skus: Sku[];
};

const sku = (id: string, zh: string, en: string, priceDelta: number, stock: number): Sku => ({
  id,
  label: { zh, en },
  priceDelta,
  stock,
});

export const products: Product[] = [
  {
    id: "p001",
    name: { zh: "无线降噪耳机 Pro", en: "Wireless Noise-Cancelling Headphones Pro" },
    description: {
      zh: "主动降噪，40 小时续航，Hi-Res 认证音质，佩戴舒适。",
      en: "Active noise cancelling, 40h battery, Hi-Res certified sound, all-day comfort.",
    },
    category: { zh: "数码", en: "Electronics" },
    basePrice: 899,
    rating: 4.8,
    reviews: 2350,
    gradient: "linear-gradient(135deg,#536dfe,#ab47bc)",
    emoji: "🎧",
    tags: { zh: ["热销", "新品"], en: ["Hot", "New"] },
    skus: [sku("std", "标准版", "Standard", 0, 120), sku("plus", "尊享版", "Deluxe", 200, 60)],
  },
  {
    id: "p002",
    name: { zh: "智能手表 S7", en: "Smart Watch S7" },
    description: { zh: "全天候健康监测，GPS 定位，14 天超长续航。", en: "All-day health tracking, GPS, 14-day battery life." },
    category: { zh: "数码", en: "Electronics" },
    basePrice: 1299,
    rating: 4.7,
    reviews: 1820,
    gradient: "linear-gradient(135deg,#00bcd4,#3f51b5)",
    emoji: "⌚",
    tags: { zh: ["热销"], en: ["Hot"] },
    skus: [sku("std", "硅胶表带", "Silicone band", 0, 200), sku("leather", "真皮表带", "Leather band", 150, 80)],
  },
  {
    id: "p003",
    name: { zh: "轻量羽绒服", en: "Lightweight Down Jacket" },
    description: { zh: "90% 白鸭绒，仅 320g，防泼水面料，可收纳成枕。", en: "90% white duck down, only 320g, water-repellent, packs into a pillow." },
    category: { zh: "服饰", en: "Apparel" },
    basePrice: 599,
    rating: 4.6,
    reviews: 980,
    gradient: "linear-gradient(135deg,#ff7043,#f4511e)",
    emoji: "🧥",
    tags: { zh: ["秋冬新款"], en: ["Fall/Winter"] },
    skus: [
      sku("m", "M 码", "Size M", 0, 50),
      sku("l", "L 码", "Size L", 0, 60),
      sku("xl", "XL 码", "Size XL", 30, 30),
    ],
  },
  {
    id: "p004",
    name: { zh: "意式半自动咖啡机", en: "Semi-Auto Espresso Machine" },
    description: { zh: "15Bar 意式萃取，蒸汽打奶泡，一键美式。", en: "15-bar extraction, steam wand, one-touch americano." },
    category: { zh: "家居", en: "Home" },
    basePrice: 1599,
    rating: 4.9,
    reviews: 760,
    gradient: "linear-gradient(135deg,#8d6e63,#4e342e)",
    emoji: "☕",
    tags: { zh: ["精品"], en: ["Premium"] },
    skus: [sku("std", "标准套装", "Standard kit", 0, 40), sku("pro", "大师套装", "Pro kit", 300, 20)],
  },
  {
    id: "p005",
    name: { zh: "人体工学椅", en: "Ergonomic Office Chair" },
    description: { zh: "4D 扶手，腰部支撑可调，135° 仰躺午休。", en: "4D armrests, adjustable lumbar support, 135° recline." },
    category: { zh: "家居", en: "Home" },
    basePrice: 1899,
    rating: 4.7,
    reviews: 1320,
    gradient: "linear-gradient(135deg,#66bb6a,#2e7d32)",
    emoji: "🪑",
    tags: { zh: ["久坐救星"], en: ["Best for work"] },
    skus: [sku("std", "标准网布", "Standard mesh", 0, 35), sku("premium", "进口网布", "Premium mesh", 400, 15)],
  },
  {
    id: "p006",
    name: { zh: "4K 运动相机", en: "4K Action Camera" },
    description: { zh: "4K60 帧，10 米裸机防水，超级防抖。", en: "4K60fps, waterproof to 10m, hyper stabilization." },
    category: { zh: "数码", en: "Electronics" },
    basePrice: 2199,
    rating: 4.8,
    reviews: 540,
    gradient: "linear-gradient(135deg,#26c6da,#01579b)",
    emoji: "📷",
    tags: { zh: ["户外"], en: ["Outdoor"] },
    skus: [sku("std", "单机", "Body only", 0, 45), sku("bundle", "配件套装", "Accessory bundle", 350, 25)],
  },
  {
    id: "p007",
    name: { zh: "纯棉四件套", en: "Cotton Bedding Set" },
    description: { zh: "60 支长绒棉，A 类母婴级，裸睡级触感。", en: "60s long-staple cotton, Class-A baby-safe, silky touch." },
    category: { zh: "家居", en: "Home" },
    basePrice: 429,
    rating: 4.5,
    reviews: 2100,
    gradient: "linear-gradient(135deg,#ba68c8,#7b1fa2)",
    emoji: "🛏️",
    tags: { zh: ["床品"], en: ["Bedding"] },
    skus: [sku("queen", "1.5m 床", "Queen", 0, 70), sku("king", "1.8m 床", "King", 60, 55)],
  },
  {
    id: "p008",
    name: { zh: "机械键盘 87 键", en: "Mechanical Keyboard 87-Key" },
    description: { zh: "Gasket 结构，三模连接，热插拔轴座。", en: "Gasket mount, tri-mode connection, hot-swappable." },
    category: { zh: "数码", en: "Electronics" },
    basePrice: 349,
    rating: 4.6,
    reviews: 3200,
    gradient: "linear-gradient(135deg,#42a5f5,#1a237e)",
    emoji: "⌨️",
    tags: { zh: ["热销"], en: ["Hot"] },
    skus: [
      sku("red", "红轴", "Red switch", 0, 90),
      sku("brown", "茶轴", "Brown switch", 0, 85),
      sku("silver", "快银轴", "Speed switch", 50, 40),
    ],
  },
];

export const categories = [
  { zh: "全部", en: "All", value: "all" },
  { zh: "数码", en: "Electronics", value: "electronics" },
  { zh: "服饰", en: "Apparel", value: "apparel" },
  { zh: "家居", en: "Home", value: "home" },
] as const;

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
