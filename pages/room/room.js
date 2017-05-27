//query1.js
//query hotel nearby
var app = getApp();
var fmt = require('../../utils/date-util');
var ora = require('../../utils/oracle-cloud');
Page({
  data: {
    modalHidden: true,
    roomDetailHidden: true,
    roomListHidden: false,
    hotel: {},
    date1: '',
    date2: '',
    rooms: [],
    chooseRoom: { name: 'Standard' }, //id: 'r001', name: 'Standard', price: 258
    nickName: '',
    mobile: ''
  },

  onLoad: function () {
    console.log('onLoad');
    var that = this;
    app.getUserInfo(function (ui) {
      //更新数据
      that.setData({
        nickName: ui.nickName
      });
    });
  },
  resolveBooking: function (res) {
    console.log(res);
    wx.hideLoading();
    wx.showToast({ title: '成功', icon: 'success', duration: 2000 });
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 2000);
  },
  bookRoom: function (e) {
    wx.showLoading({ title: 'Booking ...', });
    var data = this.data;
    var obj = {
        nickName: data.nickName,
        mobile: data.mobile,
        chooseRoom : data.chooseRoom,
        date1: data.date1,
        date2: data.date2,
        hotel: data.hotel
    }
    var url = "/data/room/" + data.mobile;
    var reject = function (err) {
      console.log(err);
      setTimeout(wx.hideLoading, 500);
    }
    ora.post(url, obj, this.resolveBooking, reject)
    
  },
  cancelRoom: function (e) {
    this.setData({
      roomDetailHidden: true,
      roomListHidden: false
    })
  },
  chooseRoom: function (e) {
    console.log('chooseRoom', e);
    var user = wx.getStorageSync('login-user');
    if (!user || !user.mobile || !user.nickName) {
      this.setData({ modalHidden: false });
      return;
    } else {
      this.setData({ mobile: user.mobile, nickName: user.nickName });
    }
    ///  
    var roomBed = e.target.dataset.bed;
    var arr = this.data.rooms;
    for (var i = 0; i < arr.length; i++) {
      var rm = arr[i];
      if (rm.name == roomBed) {
        this.setData({ chooseRoom: rm });
        wx.setStorageSync('chooseRoom', rm);
        this.setData({
          roomDetailHidden: false,
          roomListHidden: true
        })
      }
    }
  },

  modalChange: function (e) {
    //var ss = this.data.mobile;
    console.log('modalChange', e);

    var obj = {
      nickName: this.data.nickName,
      mobile: this.data.mobile,
    };

    wx.setStorageSync('login-user', obj);
    ///
    this.setData({ modalHidden: true });
  },

  modalCancel: function (e) {
    console.log('modalCancel', e);
    this.setData({ modalHidden: true });
  },

  change1: function (e) {
    this.setData({
      nickName: e.detail.value
    })
  },

  change2: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  resolve: function (res) {
    console.log(res);
    setTimeout(wx.hideLoading, 50);
    // demo data
    var arr = [];
    arr.push({ id: 'r001', name: 'Standard', price: 258 });
    arr.push({ id: 'r002', name: 'King', price: 358 });
    this.setData({ rooms: arr });
    // date 
    var dd = wx.getStorageSync('check-date');
    this.setData({
      'date1': dd.date1,
      'date2': dd.date2
    });

    // hotel
    var ht = wx.getStorageSync('hotel-item');
    this.setData({ hotel: ht });
  },

  onShow: function () {
    // Do something when page show.

    var reject = function (err) {
      console.log(err);
      setTimeout(wx.hideLoading, 500);
    }
    wx.showLoading({ title: 'Searching ...', });
    ora.get("/data/hotel", {}, this.resolve, reject);
  },
})

