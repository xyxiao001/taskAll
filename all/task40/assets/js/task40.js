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
  var date = 1
}
