'use strict'
//创建日历所占位置
var Calendar = function () {
  this.isDo = false
  this.div = this.div
  this.date = new Date()
}

Calendar.prototype.start = function () {
  var calendarDate = {}
  var weeks = ['一', '二', '三', '四', '五', '六', '日']
  calendarDate.year = this.date.getFullYear()
  calendarDate.month = this.date.getUTCMonth() + 1
  calendarDate.days = this.date.getDate()
  calendarDate.week = weeks[this.date.getDay() - 1]
  if (!this.isDo && !this.div) {
    var div = document.createElement('div')
    div.setAttribute('class', 'calendar')
    document.body.appendChild(div)
    create(div, calendarDate)
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
document.getElementById('rili').addEventListener('click', function () {
  if(!begin.isDo) {
    begin.start()
  } else {
    begin.stop()
  }
})


//绘制日历
function create(div, calendarDate) {
  div.innerHTML = ''
  var table = dayTable(div, calendarDate)
  div.appendChild(table)
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
function dayTable(div, calendarDate) {
  var table = document.createElement('table')
  var thead = document.createElement('thead')
  var tbody = document.createElement('tbody')
  var tr1 = document.createElement('tr')
  var th1 = document.createElement('th')
  var weeks = ['一', '二', '三', '四', '五', '六', '日']
  var rili = document.getElementById('rili')
  calendarDate.Alldays = days(parseInt(calendarDate.year), parseInt(calendarDate.month))
  rili.value = calendarDate.year + '年'
    + calendarDate.month + '月' +  calendarDate.days + '日'
  th1.setAttribute('colspan', 7)
  th1.style.height = '30px'
  var selectY = document.createElement('select')
  for (var y = 1970; y <= 2100; y++) {
    var option = document.createElement('option')
    option.innerHTML = y + '年'
    if (y === parseInt(calendarDate.year)) {
      option.selected = 'selected'
    }
    selectY.appendChild(option)
  }
  selectY.addEventListener('change', function () {
    calendarDate.year = this.value.substring(0, this.value.length - 1)
    create(div, calendarDate)
  })
  th1.appendChild(selectY)
  var selectM = document.createElement('select')
  for (var m = 1; m <= 12; m++) {
    var option = document.createElement('option')
    option.innerHTML = m + '月'
    if (m === parseInt(calendarDate.month)) {
      option.selected = 'selected'
    }
    selectM.appendChild(option)
  }
  selectM.addEventListener('change', function () {
    calendarDate.month = this.value.substring(0, this.value.length - 1)
    create(div, calendarDate)
  })
  th1.appendChild(selectM)
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
  var l = 0;
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
        l = l + 1
        td.innerHTML = l
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
      if (this.className !== 'afterdays' && this.className !== 'lastdays') {
        rili.value = calendarDate.year + '年'
          + calendarDate.month + '月' +  this.innerHTML + '日'
        calendarDate.days = parseInt(this.innerHTML)
        create(div, calendarDate)
        begin.stop()
      }
    })
  }
  thead.appendChild(tr2)
  table.appendChild(thead)
  table.appendChild(tbody)
  return table
}
