// auth.js — 简易商家端密码守卫（纯前端，防普通人，不防懂技术的）
(function () {
  'use strict';

  // 修改这里的密码
  var MERCHANT_PASSWORD = 'admin888';

  // 检查是否已通过验证（session 级别，关掉标签页后需重新输入）
  if (sessionStorage.getItem('merchant_authed') === '1') return;

  var input = prompt('请输入商家管理密码：');
  if (input !== MERCHANT_PASSWORD) {
    alert('密码错误，无法进入商家管理。');
    location.href = '../index.html';
    throw new Error('unauthorized');
  }
  sessionStorage.setItem('merchant_authed', '1');
})();
