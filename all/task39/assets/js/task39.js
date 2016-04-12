'use strict'
var table = document.getElementsByTagName('table')[0]
var thead = table.childNodes[1]
window.onscroll = function () {
  var tabletop = table.offsetTop + 30
  var max = table.clientHeight + tabletop - 30
  if (this.scrollY > tabletop && this.scrollY < max) {
    thead.setAttribute('class', 'fixed')
  } else {
    thead.setAttribute('class', '')
  }
}
