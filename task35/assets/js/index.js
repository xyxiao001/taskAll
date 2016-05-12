'use strict';
var go = document.getElementById('go'),
    left = document.getElementById('left'),
    right = document.getElementById('right'),
    back = document.getElementById('back'),
    blackage = document.getElementById('block'),
    begin = document.getElementById('begin'),
    other = document.getElementsByClassName('other'),
    reset = document.getElementById('reset'),
    textarea = document.getElementById('textarea'),
    rankol = document.getElementById('rankol'),
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
function keyWord(key, msg) {
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
    case 'start2':
      liBg()
      startTextArea()
      break;
    case 'resetArea':
      textarea.value = ''
      liBg()
      rankol.innerHTML = ''
      break;
    default: return erro(msg)
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
    case -1:
      if (x > -4) {
        x -= 1
        blackage.style.left = lefts + x * 43 + 'px'
      }
      break;
    case 1:
    case -3:
      if (x < 5) {
        x += 1
        blackage.style.left = lefts + x * 43 + 'px'
      }
      break;
      break;
    case 2:
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

//清空li 背景色
function liBg() {
  var li = document.getElementsByTagName('li')
  for (var i = 0; i < li.length; i++) {
    li[i].style.background = ''
  }
}

//执行多行输入框
function startTextArea() {
  var arr = textarea.value.split('\n')
  //去掉空的
  // for( var j = 0; j<arr.length; j++) {
  //   if(arr[j] == "" || typeof(arr[j]) == "undefined") {
  //     arr.splice(j,1);
  //     j = j-1;
  //   }
  // }
  var l = -1
  setInterval(function () {
    l += 1
    if (l < arr.length) {
      keyWord(arr[l], l)
    }
  }, 500)
}

//键盘事件
textarea.addEventListener('keyup', function (event) {
  textarea.value = textarea.value.toUpperCase()
})

textarea.addEventListener('keydown', function (event) {
  var content = textarea.value.split('\n')
  var length = content.length
  if (event.keyCode === 13) {
    var li = document.createElement('li')
    li.innerHTML = length + 1
    rankol.appendChild(li)
  }
  var row = document.getElementsByTagName('li')
  if (event.keyCode === 8 && length <= row.length) {
    if (row.length > 1 && content[content.length - 1].length === 0) {
      rankol.removeChild(row[row.length - 1])
    }
  }
})

textarea.addEventListener('focus', function () {
  var li = document.getElementsByTagName('li')
  if (li.length === 0) {
    var li = document.createElement('li')
    li.innerHTML = 1
    document.getElementById('rankol').appendChild(li)
  }
})

textarea.addEventListener('scroll', function () {
  var li = document.getElementsByTagName('li')
  li[0].style.marginTop = -this.scrollTop + 'px'
})
//错误 改变序号的颜色
function erro(message) {
 var li = document.getElementsByTagName('li')
 for (var j = 0; j < li.length; j = j + 1) {
   if (j == message) {
     li[j].style.background = 'red'
   }
 }
}
