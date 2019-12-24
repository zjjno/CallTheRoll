"use strict";
var app = getApp();
Page({
  data: {
    index: 0,
    title: "",
    list: String,
    name: "",
  },
  onLoad: function(params) {
    var index = +params.index;
    this.data.index = index;
    if (app.globalData.allList.length > index) {
      var listData = app.globalData.allList[index];
      this.data.title = listData.title;
      this.data.list = listData.data;
    } else {
      this.data.title = "第" + (index + 1) + "个名单";
      this.data.list = [];
      this.save();
    }
    this.setData({
      index: index,
      title: this.data.title,
      list: this.data.list,
      slideButtons: [{
        type: 'warn',
        text: '删除'
      }],
    });
  },
  slideButtonTap: function(e) {
    this.data.list.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      list: this.data.list,
    });
    this.save();
  },
  inputTitle: function(e) {
    this.data.title = e.detail.value;
    this.save();
  },
  inputName: function(e) {
    this.data.name = e.detail.value;
  },
  addName: function() {
    if (!!this.data.name) {
      this.data.list.push(this.data.name);
      this.setData({
        list: this.data.list,
        name: "",
      });
      this.save();
    }
  },
  bingo: function() {
    if (this.data.list.length) {
      var index = Math.floor(Math.random() * this.data.list.length);
      var name = this.data.list[index];
      wx.showModal({
        title: name,
        showCancel: false,
      });
    }
  },
  save: function() {
    var listData = {
      title: this.data.title,
      data: this.data.list,
    };
    app.globalData.allList[this.data.index] = listData;
    wx.setStorageSync('allList', app.globalData.allList);
  }
});