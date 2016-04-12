'use strict';
var go = document.getElementById('go'),
    left = document.getElementById('left'),
    right = document.getElementById('right'),
    back = document.getElementById('back'),
    blackage = document.getElementById('block'),
    begin = document.getElementById('begin'),
    other = document.getElementsByClassName('other'),
    reset = document.getElementById('reset'),
    direction = 0, //方向
    x = 0,
    y = 0,
    tops = 285,
    lefts = 672

//main 主函数
function main(key) {
  var text = document.getElementById('input').value.toUpperCase()
  keyWord(text)
}

//其他增加的指令
for (var i = 0; i < other.length; i++) {
  other[i].addEventListener('click', function () {
    keyWord(this.name)
  })
}

begin.addEventListener('click', main)
go.addEventListener('click', start)
right.addEventListener('click', turnRight)
left.addEventListener('click', turnLeft)
back.addEventListener('click', turnBack)
reset.addEventListener('click', function () {
  x = 0,
  y = 0,
  direction = 0
  turnTop()
  blackage.style.left = lefts + 'px'
  blackage.style.top = tops + 'px'
})

//命令的判断
function keyWord(key) {
  switch (key) {
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
    case 'TAR LEF':
      if (x > -4) {
        x -= 1
        blackage.style.left = lefts + x * 43 + 'px'
      }
      break;
    case 'TAR RIG':
      if (x < 5) {
        x += 1
        blackage.style.left = lefts + x * 43 + 'px'
      }
      break;
    case 'TAR TOP':
      if (y < 5) {
        y += 1
        blackage.style.top = tops - y * 43 + 'px'
      }
      break;
    case 'TAR BOT':
      if (y > -4) {
        y -= 1
        blackage.style.top = tops - y * 43 + 'px'
      }
      break;
    case 'MOV LEF':
      direction = 0
      turnLeft()
      setTimeout(function () {
        if (x > -4) {
          start()
        }
      }, 50)
      break;
    case 'MOV RIG':
      direction = 0
      turnRight()
      setTimeout(function () {
        if (x < 5) {
          start()
        }
      }, 50)
      break;
    case 'MOV TOP':
      direction = 0
      turnTop()
      setTimeout(function () {
        if (y < 5) {
          start()
        }
      }, 50)
      break;
    case 'MOV BOT':
      direction = 0
      turnBack()
      setTimeout(function () {
        if (y > -4) {
          start()
        }
      }, 50)
      break;
    default: alert('请输入正确指令!! 当前坐标('+ x + ',' + y + ')')
  }
}

//go
function start() {
  switch (direction%4) {
    case 0:
      if (y < 5) {
        y += 1
        blackage.style.top = tops - y * 43 + 'px'
      }
      break;
    case 3:
      if (x > -4) {
        x -= 1
        blackage.style.left = lefts + x * 43 + 'px'
      }
      break;
    case -1:
      if (x > -4) {
        x -= 1
        blackage.style.left = lefts + x * 43 + 'px'
      }
      break;
    case 1:
      if (x < 5) {
        x += 1
        blackage.style.left = lefts + x * 43 + 'px'
      }
      break;
    case -3:
      if (x < 5) {
        x += 1
        blackage.style.left = lefts + x * 43 + 'px'
      }
      break;
    case 2:
      if (y > -4) {
        y -= 1
        blackage.style.top = tops - y * 43 + 'px'
      }
      break;
    case -2:
      if (y > -4) {
        y -= 1
        blackage.style.top = tops - y * 43 + 'px'
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

//top
function turnTop() {
  direction = 0
  var rotate = 'rotate(' + direction * 90 + 'deg' + ')'
  blackage.style.transform = rotate
}
