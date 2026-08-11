// auth.js — 商家端守卫，未验证则跳转到跳舞验证页
(function () {
  'use strict';

  if (sessionStorage.getItem('merchant_authed') === '1') return;

  location.href = 'dance-verify.html';
  throw new Error('unauthorized');
})();
