// store.js — 数据读写层，所有页面共享同一个 localStorage 数据源
'use strict';

const Store = {
  // --- 菜单 ---
  getCategories() {
    return JSON.parse(localStorage.getItem('menu_categories') || '[]');
  },
  getDishes() {
    return JSON.parse(localStorage.getItem('menu_dishes') || '[]');
  },
  getDishesByCategory(categoryId) {
    return this.getDishes().filter(d => d.categoryId === categoryId);
  },
  getDishById(id) {
    return this.getDishes().find(d => d.id === Number(id));
  },

  // --- 桌位 ---
  getTables() {
    return JSON.parse(localStorage.getItem('menu_tables') || '[]');
  },
  saveTables(tables) {
    localStorage.setItem('menu_tables', JSON.stringify(tables));
  },
  getTableById(id) {
    return this.getTables().find(t => t.id === id);
  },
  updateTableStatus(tableId, status) {
    const tables = this.getTables();
    const t = tables.find(t => t.id === tableId);
    if (t) { t.status = status; this.saveTables(tables); }
  },

  // --- 购物车（按桌号存储） ---
  getCartKey(tableId) {
    return 'menu_cart_' + tableId;
  },
  getCart(tableId) {
    return JSON.parse(localStorage.getItem(this.getCartKey(tableId)) || '[]');
  },
  saveCart(tableId, cart) {
    localStorage.setItem(this.getCartKey(tableId), JSON.stringify(cart));
  },
  addToCart(tableId, dish) {
    const cart = this.getCart(tableId);
    const existing = cart.find(item => item.dishId === dish.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ dishId: dish.id, name: dish.name, price: dish.price, emoji: dish.emoji, qty: 1 });
    }
    this.saveCart(tableId, cart);
  },
  removeFromCart(tableId, dishId) {
    let cart = this.getCart(tableId);
    cart = cart.filter(item => item.dishId !== Number(dishId));
    this.saveCart(tableId, cart);
  },
  updateCartQty(tableId, dishId, qty) {
    const cart = this.getCart(tableId);
    const item = cart.find(item => item.dishId === Number(dishId));
    if (item) {
      item.qty = Math.max(1, qty);
      this.saveCart(tableId, cart);
    }
  },
  getCartTotal(tableId) {
    return this.getCart(tableId).reduce((sum, item) => sum + item.price * item.qty, 0);
  },
  getCartCount(tableId) {
    return this.getCart(tableId).reduce((sum, item) => sum + item.qty, 0);
  },
  clearCart(tableId) {
    localStorage.removeItem(this.getCartKey(tableId));
  },

  // --- 订单 ---
  getOrders() {
    return JSON.parse(localStorage.getItem('menu_orders') || '[]');
  },
  saveOrders(orders) {
    localStorage.setItem('menu_orders', JSON.stringify(orders));
  },
  createOrder(order) {
    const orders = this.getOrders();
    order.id = Date.now();
    order.createdAt = new Date().toISOString();
    order.status = 'new';
    // 为每个菜品项添加追踪
    order.items.forEach((item, idx) => {
      item.status = 'new';
      item.itemId = order.id + '-' + idx;
    });
    orders.unshift(order);
    this.saveOrders(orders);
    return order;
  },
  getOrderById(id) {
    return this.getOrders().find(o => o.id === Number(id));
  },
  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const o = orders.find(o => o.id === Number(orderId));
    if (o) { o.status = status; this.saveOrders(orders); }
  }
};
