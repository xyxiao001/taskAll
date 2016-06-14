'use strict';
var go = document.getElementById('go'),
    left = document.getElementById('left'),
    right = document.getElementById('right'),
    back = document.getElementById('back'),
    blackage = document.getElementById('block'),
    style =  window.getComputedStyle(blackage),
    begin = document.getElementById('begin'),
    direction = 0 //方向


begin.addEventListener('click', main)
go.addEventListener('click', start)
right.addEventListener('click', turnRight)
left.addEventListener('click', turnLeft)
back.addEventListener('click', turnBack)

//main
function main() {
  var text = document.getElementById('input').value.toUpperCase()
  switch (text) {
    case 'GO':
      start()
      break;
    case 'TUN LEF':
      turnLeft()
      break;
    case 'TUN RIG':
      turnRight()
      break;
    case 'TUN BAC':
      turnBack()
      break;
    default: alert('请输入正确的指令')

  }
}

//go
function start() {
  var t = style.top,
      top = t.substring(0, t.length-2),
      l = style.left,
      left = l.substring(0, l.length-2)
  switch (direction%4) {
    case 0:
      if (top > 70) {
        blackage.style.top = (Number(top) - 43) + 'px'
      }
      break;
    case 3:
      if (left > 500) {
        blackage.style.left = (Number(left) - 43) + 'px'
      }
      break;
    case -1:
      if (left > 500) {
        blackage.style.left = (Number(left) - 43) + 'px'
      }
      break;
    case 1:
      if (left < 850) {
        blackage.style.left = (Number(left) + 43) + 'px'
      }
      break;
    case -3:
      if (left < 850) {
        blackage.style.left = (Number(left) + 43) + 'px'
      }
      break;
    case 2:
      if (top < 450) {
        blackage.style.top = (Number(top) + 43) + 'px'
      }
      break;
    case -2:
      if (top < 450) {
        blackage.style.top = (Number(top) + 43) + 'px'
      }
      break;

  }
}

//right
function turnRight() {
  direction += 1
  var rotate = 'rotate(' + direction * 90 + 'deg' + ')'
  blackage.style.transform = rotate
}

//left
function turnLeft() {
  direction -= 1
  var rotate = 'rotate(' + direction * 90 + 'deg' + ')'
  blackage.style.transform = rotate
}

//back
function turnBack() {
  direction += 2
  var rotate = 'rotate(' + direction * 90 + 'deg' + ')'
  blackage.style.transform = rotate
}
