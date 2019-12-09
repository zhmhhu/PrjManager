import Vue from 'vue'
Vue.filter("formatDate", function formatDate(value) {
  var date = new Date(value);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
});
Vue.filter("formatDateTime", function formatDateTime(value) {
  var date = new Date(value);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
});

Vue.filter("formatUnitType", function formatUnitType(value) {
    var typeString = ""+value;  //转换成字符串
    if (typeString.indexOf('(0)') >-1) {
      typeString.replace('(0)','施工单位')
    }
    if (typeString.indexOf('(1)') >-1) {
      typeString.replace('(1)','监理单位')
    }
    if (typeString.indexOf('(2)') >-1) {
      typeString.replace('(2)','设计单位')
    }
    if (typeString.indexOf('(3)') >-1) {
      typeString.replace('(3)','建设单位')
    }
    if (typeString.indexOf('(4)') >-1) {
      typeString.replace('(4)','勘察单位')
    }

    return typeString;
  });