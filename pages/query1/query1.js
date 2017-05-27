//query1.js
//query hotel nearby
var app = getApp();
var fmt = require('../../utils/date-util');
var ora = require('../../utils/oracle-cloud');
Page({
  data: {
    hotels: [],

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
     var reject = function (err) {
      console.log(err);
      setTimeout(wx.hideLoading, 50);
    }
    wx.showLoading({ title: 'Searching ...', });
    ora.get("/data/hotel", {}, this.resolve, reject);
  },

  hotelTap : function(e){
    console.log('hotel-Tap: ' , e);
    var _obj = {
      id : e.currentTarget.id,
      name : e.currentTarget.dataset.name,
      address : e.currentTarget.dataset.address,
      image : e.currentTarget.dataset.image
    } 
    wx.setStorageSync('hotel-item', _obj);
    wx.navigateTo({
      url: '../room/room?level=1'
    })
  },

  resolve: function (res) {
    console.log(res);
    setTimeout(wx.hideLoading, 50);
    var arr = [];
    for (var i = 0; i < res.data.length; i++) {
      var x = res.data[i];
      x.image = "/images/" + x.image;
      arr.push(x);
    }
    this.setData({ hotels: arr });
  },

  onShow: function () {
    // Do something when page show.

   
  },
})

