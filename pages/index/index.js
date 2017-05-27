//index.js
//获取应用实例
var app = getApp();
var fmt = require('../../utils/date-util');
Page({
  data: {
    motto: 'Hello World',
    date1: "2016-09-01",
    date2: "2016-09-01",
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    var tday = new Date();
    var nday = fmt.addDay(tday, 1);
    that.setData({
      date1: fmt.formatDay(tday),
      date2: fmt.formatDay(nday)
    });
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  bindDate1Change: function (e) {
    this.setData({
      date1: e.detail.value
    })
  },
  bindDate2Change: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },

  btnSearch: function (e) {
    var objParams = { //单程的params的参数
      date1: this.data.date1,
      date2: this.data.date2,
    };

    wx.setStorageSync('check-date', objParams);//同步缓存SearchProductList请求数据

    wx.navigateTo({
      url: '../query1/query1?level=1'
    })
  }

})
