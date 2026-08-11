// data-init.js — 模拟数据初始化（首次使用时注入到 localStorage）
(function () {
  'use strict';

  if (localStorage.getItem('menu_initialized')) return;

  // 初始化桌位
  const tables = [];
  const letters = ['A', 'B'];
  letters.forEach(l => {
    for (let i = 1; i <= 4; i++) {
      tables.push({ id: l + i, name: l + i, status: 'free' });
    }
  });

  // 菜品数据 — 复用之前 menu-data 的模式
  const categories = [
    { id: 'hot', name: '热菜' },
    { id: 'cold', name: '凉菜' },
    { id: 'soup', name: '汤羹' },
    { id: 'staple', name: '主食' },
    { id: 'drink', name: '饮品' },
    { id: 'dessert', name: '甜品' }
  ];

  const dishes = [
    // 热菜
    { id: 1, categoryId: 'hot', name: '宫保鸡丁', price: 38, desc: '鸡腿肉配花生米，微辣咸鲜', emoji: '🍗', bg: '#f5d0a9', isFeatured: true },
    { id: 2, categoryId: 'hot', name: '红烧肉', price: 48, desc: '肥而不腻，入口即化', emoji: '🍖', bg: '#e8b0a0', isFeatured: true },
    { id: 3, categoryId: 'hot', name: '鱼香肉丝', price: 32, desc: '酸甜微辣，下饭神器', emoji: '🥩', bg: '#f2c79a' },
    { id: 4, categoryId: 'hot', name: '水煮鱼', price: 58, desc: '麻辣鲜香，鱼片嫩滑', emoji: '🐟', bg: '#f5b0a0', isFeatured: true },
    { id: 5, categoryId: 'hot', name: '麻婆豆腐', price: 26, desc: '麻辣烫嫩，经典川菜', emoji: '🌶️', bg: '#f0c0b0' },
    { id: 6, categoryId: 'hot', name: '干煸四季豆', price: 28, desc: '干香爽脆，微辣鲜香', emoji: '🥬', bg: '#b8d8a0' },

    // 凉菜
    { id: 7, categoryId: 'cold', name: '凉拌黄瓜', price: 16, desc: '爽口开胃，蒜香浓郁', emoji: '🥒', bg: '#b8e0b8' },
    { id: 8, categoryId: 'cold', name: '夫妻肺片', price: 42, desc: '麻辣鲜香，回味无穷', emoji: '🥓', bg: '#f0c0a8', isFeatured: true },
    { id: 9, categoryId: 'cold', name: '皮蛋豆腐', price: 18, desc: '嫩滑清爽，咸鲜适口', emoji: '🥚', bg: '#f0e0b0' },
    { id: 10, categoryId: 'cold', name: '口水鸡', price: 36, desc: '香辣爽口，鸡肉鲜嫩', emoji: '🍗', bg: '#f5d0b0' },

    // 汤羹
    { id: 11, categoryId: 'soup', name: '西红柿蛋汤', price: 20, desc: '酸甜开胃，家常味道', emoji: '🍅', bg: '#f0b8a8' },
    { id: 12, categoryId: 'soup', name: '冬瓜排骨汤', price: 38, desc: '清淡滋补，汤鲜味美', emoji: '🥣', bg: '#d8e8e0' },
    { id: 13, categoryId: 'soup', name: '酸辣汤', price: 24, desc: '酸辣爽口，暖胃驱寒', emoji: '🍲', bg: '#f0c8a8' },
    { id: 14, categoryId: 'soup', name: '菌菇鸡汤', price: 45, desc: '菌菇醇香，鸡汤浓郁', emoji: '🍄', bg: '#e0d0b0', isFeatured: true },

    // 主食
    { id: 15, categoryId: 'staple', name: '米饭', price: 3, desc: '东北大米，粒粒饱满', emoji: '🍚', bg: '#f5f0e0' },
    { id: 16, categoryId: 'staple', name: '扬州炒饭', price: 22, desc: '配料丰富，粒粒分明', emoji: '🍛', bg: '#f2e0b0' },
    { id: 17, categoryId: 'staple', name: '手工水饺', price: 26, desc: '皮薄馅大，鲜香多汁', emoji: '🥟', bg: '#f0e8d8', isFeatured: true },
    { id: 18, categoryId: 'staple', name: '葱油拌面', price: 18, desc: '葱香扑鼻，爽滑劲道', emoji: '🍜', bg: '#f2d8a8' },
    { id: 19, categoryId: 'staple', name: '小笼包', price: 24, desc: '皮薄汤足，鲜香四溢', emoji: '🥢', bg: '#f0e8e0' },

    // 饮品
    { id: 20, categoryId: 'drink', name: '鲜榨西瓜汁', price: 16, desc: '冰爽清甜，现榨现喝', emoji: '🍉', bg: '#f0b0a0' },
    { id: 21, categoryId: 'drink', name: '柠檬冰红茶', price: 12, desc: '清爽解腻，夏日必备', emoji: '🍋', bg: '#f2d8a0' },
    { id: 22, categoryId: 'drink', name: '青岛啤酒', price: 15, desc: '冰镇更爽，畅快开怀', emoji: '🍺', bg: '#f0e0b0' },
    { id: 23, categoryId: 'drink', name: '酸梅汤', price: 10, desc: '生津止渴，酸甜开胃', emoji: '🧋', bg: '#c8b0a0' },
    { id: 24, categoryId: 'drink', name: '现磨豆浆', price: 8, desc: '豆香浓郁，营养健康', emoji: '🥛', bg: '#f2eee0' },

    // 甜品
    { id: 25, categoryId: 'dessert', name: '杨枝甘露', price: 22, desc: '芒果西米，清甜爽口', emoji: '🥭', bg: '#f5d8a0', isFeatured: true },
    { id: 26, categoryId: 'dessert', name: '红豆双皮奶', price: 18, desc: '奶香浓郁，红豆绵甜', emoji: '🍮', bg: '#f2e8e0' },
    { id: 27, categoryId: 'dessert', name: '水果拼盘', price: 28, desc: '时令鲜果，清爽解腻', emoji: '🍇', bg: '#d8e8c8' },
    { id: 28, categoryId: 'dessert', name: '红糖糍粑', price: 16, desc: '软糯香甜，外脆里嫩', emoji: '🍡', bg: '#f0d0a8' }
  ];

  localStorage.setItem('menu_categories', JSON.stringify(categories));
  localStorage.setItem('menu_dishes', JSON.stringify(dishes));
  localStorage.setItem('menu_tables', JSON.stringify(tables));
  localStorage.setItem('menu_orders', JSON.stringify([]));
  localStorage.setItem('menu_initialized', '1');
})();
