'use strict'
//创建日历所占位置
var Calendar = function () {
  this.isDo = false
  this.div = this.div
}

Calendar.prototype.start = function () {
  if (!this.isDo && !this.div) {
    var div = document.createElement('div')
    div.setAttribute('class', 'calendar')
    document.body.appendChild(div)
    var date = new Date()
    create(div, date)
    this.div = div
  } else {
    this.div.style.display = 'block'
  }
  this.isDo = true
}

Calendar.prototype.stop = function () {
  if (this.isDo) {
    this.div.style.display = 'none'
  }
  this.isDo = false
}

var begin = new Calendar()
begin.start()
document.getElementById('rili').addEventListener('click', function () {
  if(!begin.isDo) {
    begin.start()
  } else {
    begin.stop()
  }
})


//绘制日历
function create(div, date) {
  var calendarDate = {}
  var weeks = ['一', '二', '三', '四', '五', '六', '日']
  calendarDate.year = date.getFullYear()
  calendarDate.month = date.getUTCMonth() + 1
  calendarDate.days = date.getDate()
  calendarDate.week = weeks[date.getDay() - 1]
  calendarDate.Alldays = days(calendarDate.year, calendarDate.month)
  var table = dayTable(calendarDate)
  div.appendChild(table)
}

function remove(div) {
  div.removeChild('table')
}


//返回天数
function days(year, month) {
  var days = 30
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
      days = 31
      break
    case 2:
      if (year % 4 ===  0 && year % 100 !==  0) {
        days = 29
      } else {
        if (year % 400 === 0) {
          days = 29
        } else {
          days = 28
        }
      }
      break
  }
  return days
}


//日历
function dayTable(calendarDate) {
  var table = document.createElement('table')
  var thead = document.createElement('thead')
  var tbody = document.createElement('tbody')
  var tr1 = document.createElement('tr')
  var th1 = document.createElement('th')
  var weeks = ['一', '二', '三', '四', '五', '六', '日']
  th1.setAttribute('colspan', 7)
  th1.style.height = '30px'
  th1.innerHTML = calendarDate.year + '年' + calendarDate.month + '月'
  th1.setAttribute('class', 'month')
  tr1.appendChild(th1)
  thead.appendChild(tr1)
  var tr2 = document.createElement('tr')
  for (var i = 0; i < weeks.length; i++) {
   var th2 = document.createElement('th')
    th2.innerHTML = weeks[i]
    tr2.appendChild(th2)
  }
  //tbody
  var firstDay = new Date(calendarDate.year + "/" + calendarDate.month + "/" + 1).getDay()
  var lastDay = days(calendarDate.year, calendarDate.month - 1)
  var dayArr = []
  for (var x = 2; x <= firstDay; x++) {
    dayArr.push(lastDay - firstDay + x)
  }
  for (var y = 1; y <= calendarDate.Alldays; y++) {
    dayArr.push(y)
  }
  for (var start = 0; start < 35; start++){
    if (start === 0 || start % 7 === 0) {
      var tr = document.createElement('tr')
    }
    var td = document.createElement('td')
    if (start > firstDay - 2) {
      td.innerHTML = dayArr[start]
      if (dayArr[start] === calendarDate.days) {
        td.setAttribute('class', 'choose')
      }
      if (start >= calendarDate.Alldays + firstDay - 1) {
        td.innerHTML = 35 - start
        td.setAttribute('class', 'afterdays')
      }
    } else {
      td.innerHTML = dayArr[start]
      td.setAttribute('class', 'lastdays')
    }
    tr.appendChild(td)
    if (start === 0 || start % 7 === 0) {
      tbody.appendChild(tr)
    }
    td.addEventListener('click', function () {
      var time = document.getElementById('time')
      if (this.className === 'afterdays') {
        time.innerHTML = calendarDate.year + '年'
          + (calendarDate.month + 1) + '月' +  this.innerHTML + '日'
      } else if (this.className === 'lastdays') {
        time.innerHTML = calendarDate.year + '年'
          + (calendarDate.month - 1) + '月' +  this.innerHTML + '日'
      } else {
        time.innerHTML = calendarDate.year + '年'
          + calendarDate.month + '月' +  this.innerHTML + '日'
      }
    })
  }
  thead.appendChild(tr2)
  table.appendChild(thead)
  table.appendChild(tbody)
  return table
}
