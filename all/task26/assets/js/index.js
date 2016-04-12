'use strict';
//现在存在的飞船
var airship = 0

//添加飞船
var add = document.getElementById('add')

add.addEventListener('click', addAirship)

//飞船起飞
function addAirship() {
  airship = airship + 1
  var item = airship
  if (airship > 4) {
    alert('已经有四个飞船啦, 请先销毁')
  } else {
    //创建飞船
    createAirship(item)
  }
}

//创建飞船
function createAirship(item) {
  var energy = 1000
  var airDiv = document.createElement('div')
  var universe = document.getElementById('universe')
  //地球
  var earth = document.getElementById('earth')
  var all = document.getElementById('allairship')
  var stop = false
  airDiv.className = 'airDiv'
  airDiv.id = 'airDiv' + item
  airDiv.innerHTML =  item + '号' + energy + '%'
  all.appendChild(airDiv)
  rotateAirshio(airDiv, all, energy, stop, item)
}

//飞船旋转
function rotateAirshio(airDiv, all, energy, stop, item) {
  //得到当前的飞船
  var nowAirship = 'airDiv' + item
  var airshipID = document.getElementById(nowAirship)

  //创建飞船控制
  var airConsole =  document.createElement('div')

  //开始
  var startButton = document.createElement('button')
  startButton.id = 'buttonStart' + item
  startButton.innerHTML = item + '号开始'
  var buttonStart = 'buttonStart' + item
  airConsole.appendChild(startButton)

  //停止
  var stopButton = document.createElement('button')
  stopButton.id = 'buttonStop' + item
  stopButton.innerHTML = item + '号停止'
  var buttonStop = 'buttonStop' + item
  airConsole.appendChild(stopButton)

  //销毁
  var removeButton = document.createElement('button')
  removeButton.id = 'buttonRemove' + item
  removeButton.innerHTML = item + '号销毁'
  var buttonRemove = 'buttonRemove' + item
  airConsole.appendChild(removeButton)

  document.getElementById('console').appendChild(airConsole)
  document.getElementById(buttonStop).addEventListener('click', function () {
    stop = true
    setInterval(function () {
      if (energy < 1000 && stop) {
        energy = energy + 2
        airDiv.innerHTML =  item + '号飞船' + Math.ceil(energy/10) + '%'
      } else {
        return false
      }
    }, 100)
  })
  document.getElementById(buttonStart).addEventListener('click', function () {
    stop = false
  })
  document.getElementById(buttonRemove).addEventListener('click', removeShip)
  //移除飞船
  function removeShip() {
    all.removeChild(airshipID)
    document.getElementById('console').removeChild(airConsole)
    stop = true
    airship = airship - 1
  }
  //圆
  var r = 150
  var x = 200
  var y = 200
  //当前坐标
  var num = 0
  setInterval(function () {
    //能源
    if (energy > 0) {
      if (!stop) {
        num = num + 1
        //能源消耗
        energy = energy - 5
      } else {
        stop = true
        return false
      }
      energy = energy + 2
      airDiv.innerHTML =  item + '号飞船' + Math.ceil(energy/10) + '%'
      var a = Math.sin( num*Math.PI/180) * r
      var b = Math.cos( num*Math.PI/180) * r
      airshipID.style.left = x + b + 'px';
      airshipID.style.top = y + a + 'px';
      all.appendChild(airDiv)
    }
    else {
      stop = true
      energy = energy + 2
      airDiv.innerHTML =  item + '号飞船' + Math.ceil(energy/10) + '%'
      return false
    }
  }, 100)
}
