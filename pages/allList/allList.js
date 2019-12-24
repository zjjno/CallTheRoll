"use strict";
var app = getApp();
Page({
  data: {
    allList: [],
  },
  onLoad: function() {
    this.setData({
      slideButtons: [{
        type: 'warn',
        text: '删除'
      }],
    });
  },
  onShow: function() {
    this.setData({
      allList: app.globalData.allList,
    });
  },
  showList: function(e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../addList/addList?index=' + index,
    });
  },
  slideButtonTap: function(e) {
    app.globalData.allList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      allList: app.globalData.allList,
    });
    wx.setStorageSync('allList', app.globalData.allList);
  },
  addNameList: function() {
    wx.navigateTo({
      url: '../addList/addList?index=' + app.globalData.allList.length,
    });
  },
});