
// oracle-cloud service

// var _host = "http://127.0.0.1:9001";
var _host = "https://d38ad2e3.ngrok.io"

function get(url, param, resolve, reject){
      
      var _url = _host + url;
      wx.request({
        url: _url,
        data: param,
        header: {},
        method: "GET",
        success: resolve,
        fail: reject
    })
}

function post(url, param, resolve, reject){
      var _url = _host + url;
      wx.request({
        url: _url,
        data: JSON.stringify(param),
        header: {},
        method: "POST",
        success: resolve,
        fail: reject
    })
}

module.exports = {
  get: get,
  post : post
}