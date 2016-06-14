'use strict'
//创建浮出层
var winput = document.getElementsByTagName('input')[name = 'width']
var hinput = document.getElementsByTagName('input')[name = 'height']
var number = function (el) {
  el.addEventListener('keyup', function () {
    document.getElementById('error').innerHTML = ''
    this.value = this.value.replace(/[^0-9]/g, '')
    if (this.value > 1001) {
      document.getElementById('error').innerHTML = '浮出层最大为1000 * 1000'
      this.value = el.name === 'width' ? 300 : 200
    }
    if (this.value === '0') {
      this.value = el.name === 'width' ? 300 : 200
    }
  })
}
number(winput)
number(hinput)
document.getElementById('start').addEventListener('click', function (event) {
  event.preventDefault();
  var width = winput.value || 300
  var height = hinput.value || 200
  surfaced(width, height)
  //创建遮罩层
  cover()
})
//浮出层
var surfaced = function (width, height) {
  var div = document.createElement('div')
  div.id = 'surdiv'
  div.setAttribute('class',  'fade')
  div.style.width = width + 'px'
  div.style.height = height + 'px'
  document.body.appendChild(div)
  div.addEventListener('mousemove', function() {
    tuo(div)
  })
  var header = document.createElement('div')
  header.style.width = width + 'px'
  header.style.height = height * 0.2 + 'px'
  header.style.background= 'grey'
  header.innerHTML = '这是一个浮出层'
  header.style.paddingTop = height * 0.1 + 'px'
  div.appendChild(header)
  var content = document.createElement('div')
  content.style.height = height * 0.5 + 'px'
  content.innerHTML = '不充钱怎么玩游戏？'
  div.appendChild(content)
  var footer = document.createElement('div')
  div.appendChild(footer)
  var ok = document.createElement('button')
  var cancle = document.createElement('button')
  ok.innerHTML = '确认'
  ok.setAttribute('class', 'button')
  cancle.innerHTML = '取消'
  cancle.setAttribute('class', 'button')
  footer.appendChild(cancle)
  footer.appendChild(ok)
  ok.addEventListener('click', function () {
    document.body.removeChild(document.getElementById('cover'))
    document.body.removeChild(document.getElementById('surdiv'))
  })
  cancle.addEventListener('click', function () {
    alert('真的不充钱吗？')
    document.body.removeChild(document.getElementById('cover'))
    document.body.removeChild(document.getElementById('surdiv'))
  })
}

//拖动
var tuo = function (el) {
  var mousex, mousey;
  var move = function () {
    el.style.left = event.x - mousex + 'px'
    el.style.top = event.y - mousey + 'px'
  };
  el.addEventListener('mousedown', function () {
    mousex = event.x - el.offsetLeft
    mousey = event.y - el.offsetTop
    document.addEventListener('mousemove', move);
  })
  el.addEventListener('mouseup', function () {
    document.removeEventListener("mousemove", move, false);
  })
}

//遮罩层
var cover = function () {
  var div = document.createElement('div')
  div.id = 'cover'
  div.setAttribute('class', 'cover')
  document.body.appendChild(div)
  div.addEventListener('click', function () {
    document.body.removeChild(div)
    document.body.removeChild(document.getElementById('surdiv'))
  })
}
