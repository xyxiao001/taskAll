'use strict'

//从大到小
var asc = (function () {
  var arr = document.getElementsByClassName('fa-sort-asc')
  for (var i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', function () {
      tables(this.parentNode, 'max')
    })
  }
})()


//从小到大
var desc = (function () {
  var arr = document.getElementsByClassName('fa-sort-desc')
  for (var i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', function () {
      tables(this.parentNode, 'min')
    })
  }
})()

var tables = function (node, size) {
  var th = document.getElementsByTagName('th')
  var index
  for (var x = 0; x < th.length; x++) {
    if (th[x] === node) {
      index = x
    }
  }
  var arr = [];
  var table = document.getElementsByTagName('table')[0]
  //table.tBodies 返回tbody的集合
  for(var i = 0; i < table.tBodies[0].rows.length; i++)
    {
      arr[i] = table.tBodies[0].rows[i];
    }
  arr.sort(function(tr1, tr2){
    var a = parseInt(tr1.cells[index].innerHTML)
    var b = parseInt(tr2.cells[index].innerHTML)
    if (size === 'max') {
      return b - a
    } else {
      return a - b
    }
  })
  //排序后添加上去
  for(var j = 0; j<arr.length; j++)
  {
   table.tBodies[0].appendChild(arr[j]);
  }
}
