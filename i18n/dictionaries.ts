import type { Locale } from "./config";

export const dictionaries = {
  zh: {
    nav: { home: "首页", products: "商品", cart: "购物车", orders: "我的订单" },
    home: { heroTitle: "精选好物，一站购齐", heroSubtitle: "新用户专享优惠，全场包邮", shopNow: "立即选购", featured: "为你推荐" },
    search: { placeholder: "搜索商品名称或描述", title: "搜索结果", empty: "没有找到相关商品", all: "全部商品", resultCount: "个商品", sort: "排序", sortFeatured: "推荐", sortRating: "评分最高", sortPriceAsc: "价格从低到高", sortPriceDesc: "价格从高到低" },
    product: {
      addToCart: "加入购物车",
      buyNow: "立即购买",
      inStock: "现货",
      selectSku: "选择规格",
      quantity: "数量",
      description: "商品详情",
      specs: "规格参数",
      added: "已加入购物车",
    },
    cart: {
      title: "购物车",
      empty: "购物车是空的",
      goShopping: "去逛逛",
      subtotal: "小计",
      total: "合计",
      checkout: "去结算",
      remove: "删除",
      freeShipping: "再加 {amount} 即享免邮",
      freeShippingUnlocked: "🎉 已解锁免邮！",
    },
    checkout: {
      title: "确认订单",
      address: "收货地址",
      name: "收货人",
      phone: "手机号",
      addressDetail: "详细地址",
      payment: "支付方式",
      payOnline: "在线支付（Mock）",
      submit: "提交订单",
      success: "下单成功！",
      successDesc: "这是演示环境，订单已保存在本地。",
      viewOrders: "查看订单",
      orderSummary: "订单摘要",
    },
    orders: { title: "我的订单", empty: "暂无订单", orderNo: "订单号", date: "下单时间", status: "已支付（模拟）" },
    common: { currency: "¥" },
  },
  en: {
    nav: { home: "Home", products: "Products", cart: "Cart", orders: "Orders" },
    home: { heroTitle: "Curated goods, all in one place", heroSubtitle: "New-user deals, free shipping", shopNow: "Shop now", featured: "Featured for you" },
    search: { placeholder: "Search products", title: "Search results", empty: "No products found", all: "All products", resultCount: "products", sort: "Sort", sortFeatured: "Featured", sortRating: "Top rated", sortPriceAsc: "Price: low to high", sortPriceDesc: "Price: high to low" },
    product: {
      addToCart: "Add to cart",
      buyNow: "Buy now",
      inStock: "In stock",
      selectSku: "Select option",
      quantity: "Quantity",
      description: "Description",
      specs: "Specifications",
      added: "Added to cart",
    },
    cart: {
      title: "Cart",
      empty: "Your cart is empty",
      goShopping: "Start shopping",
      subtotal: "Subtotal",
      total: "Total",
      checkout: "Checkout",
      remove: "Remove",
      freeShipping: "Add {amount} more for free shipping",
      freeShippingUnlocked: "🎉 You've unlocked free shipping!",
    },
    checkout: {
      title: "Confirm order",
      address: "Shipping address",
      name: "Recipient",
      phone: "Phone",
      addressDetail: "Address",
      payment: "Payment",
      payOnline: "Online payment (Mock)",
      submit: "Place order",
      success: "Order placed!",
      successDesc: "This is a demo; the order is stored locally.",
      viewOrders: "View orders",
      orderSummary: "Order summary",
    },
    orders: { title: "My orders", empty: "No orders yet", orderNo: "Order No.", date: "Date", status: "Paid (mock)" },
    common: { currency: "$" },
  },
} as const;

export type Dictionary = (typeof dictionaries)["zh"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}
