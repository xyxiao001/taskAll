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
    create(div)
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
function create(div) {
  var date = new Date()
  var calendarDate = {}
  var weeks = ['一', '二', '三', '四', '五', '六', '日']
  calendarDate.today = date.toLocaleString()
  calendarDate.year = date.getFullYear()
  calendarDate.month = date.getUTCMonth() + 1
  calendarDate.days = date.getDate()
  calendarDate.week = weeks[date.getDay() - 1]
  console.log(calendarDate)
  var table = document.createElement('table')
  var thead = document.createElement('thead')
  var tr1 = document.createElement('tr')
  var th1 = document.createElement('th')
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
  thead.appendChild(tr2)
  table.appendChild(thead)
  div.appendChild(table)
}
