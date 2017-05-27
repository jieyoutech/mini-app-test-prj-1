function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatDay(date) {
  if(!!date){
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(formatNumber).join('-');
  }
}

function day2day(date1, date2) {
  if(!!date1 && !!date2){
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(formatNumber).join('-');
  }
}

function add_day(date1, day) {
  if(!!date1 && !!day){
    var date2 = new Date();
    date2.setTime(date1.getTime() + (day*24*3600*1000)); 
    return date2 ;
  }
}

function parseDatetime(input) {
      if (typeof(input) == "object" && input instanceof Date)
        return input;
      var parts = input.match(/(\d+)/g);
      return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
    };

function parseDate(input) {
      if (typeof(input) == "object" && input instanceof Date)
        return input;
      var parts = input.match(/(\d+)/g);
      return new Date(parts[0], parts[1] - 1, parts[2]);
    };    

module.exports = {
  formatDay: formatDay,
  day2day : day2day,
  parseDate : parseDate,
  parseDatetime : parseDatetime,
  addDay : add_day
}