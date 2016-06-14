'use strict'
var ball = document.querySelector('#ball')
var i = 0
document.querySelector('button[name=start]').addEventListener('click', function () {
  event.preventDefault()
  var v = document.querySelectorAll('input')[0].value> 0 ?
          document.querySelectorAll('input')[0].value : 50
  var h = document.querySelectorAll('input')[1].value > 0 ?
          document.querySelectorAll('input')[1].value : 500
  begin(v, h)
})

var begin = function (v, h) {
  ball.style.top = '0px'
  ball.style.left = '0px'
  i = 0
  if (ball.style.top == '0px') {
    // 得到高度 计算时间
    var t = Math.sqrt(0.2 * h)
    setInterval(function () {
      i = i + 0.01
      if (i < t ) {
        ball.style.top = (0.5 * 10 * i * i) + 'px'
        ball.style.left = (v * i) + 'px'
        var div = document.createElement('div')
        div.className = 'line'
        document.body.appendChild(div)
        div.style.top = (0.5 * 10 * i * i) + 'px'
        div.style.left = (v * i) + 'px'
      } else {
        return false
      }
    }, 10)
  }
}
