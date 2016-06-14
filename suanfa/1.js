 //素数返回true，非素数返回false
function isPrime(n) {
  if (Object.prototype.toString.call(n).slice(8, -1) === 'Number') {
    var t;
    if (n <= 1) return false;
    if (n == 2) return true;
    else {
      for (t = 2; t * t <= n; t++) {
        if (n % t == 0) {
          return false;
        }
      }
      if (t * t > n) return true;
    }
  }
}

//返回数组中第二大的数，注意边界条件
function getSecond(arr){
  if(Object.prototype.toString.call(arr).slice(8,-1)==='Array') {
    if (arr.length === 1) {
      return arr[0]
    } else {
      var n = arr.sort(
        function (a, b) {
          return b-a
        }
      )
      return n[1]
    }
  }
}

//逆序排列
function isString(obj){ //判断对象是否是字符串
  if (Object.prototype.toString.call(obj).slice(8, -1) === 'String') {
   return true
  } else {
    return false
  }
}
