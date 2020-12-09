var array = Array.from({ length: 50 }).map((_, index) => (index + 1))

// function remove(arr, item) {
//   var
//     i = -1
//   while (++i < arr.length) {
//     if (arr[i] === item) {
//       arr.splice(i, 1)
//       i--
//     }
//   }
//   return arr
// }
//
// function removeWithoutCopy(arr, item) {
//   var count = 0;
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] === item)
//       count++;
//   }
//   arr.splice(arr.indexOf(item), count);
//   return arr;
// }
//
//
// function append(arr, item) {
//   var i = -1, len = arr.length, r = Array(len + 1)
//   r[0] = item
//   while (++i < len) {
//     r[i + 1] = arr[i]
//   }
//   return r.slice(1)
// }
//
// function insert(arr, item, index) {
//   var r = []
//   for (var i = 0; i < arr.length; i++) {
//     if (i === index) r.push(item)
//     r.push(arr[i])
//   }
//   return r
// }
//
// function count(arr, item) {
//   let i = -1, len = arr.length, r = 0
//   while (++i < len) {
//     if (item === arr[i]) r++
//   }
//   return r
// }
//
// function duplicates(arr) {
//   let i = -1,
//     len = arr.length,
//     r = [],
//     o = {}
//   while (++i < len) {
//     var it = arr[i]
//     if (!o[it]) {
//       o[it] = 1
//     } else {
//       o[it]++
//       if (o[it] === 2) {
//         r.push(it)
//       }
//     }
//   }
//   return r
// }
//
// function square(arr) {
//   var i = -1, len = arr.length, r = Array()
//   while (++i < len) {
//     var it = arr[i]
//     r.push(it * it)
//   }
//   return r
// }
//
// function findAllOccurrences(arr, target) {
//   var i = -1, len = arr.length, r = Array()
//   while (++i < len) {
//     var it = arr[i]
//     if (it === target) r.push(i)
//   }
//   return r
// }
//
// function parse2Int(num) {
//   return parseInt(num.match(/^[0-9]/ig)[0]);
// }

// console.log(parse2Int('0x12'))


function count(start, end) {
  var num = start,
    timer = null

  function handle() {
    console.log(num)
    num++
    if (end < num) clearHandle()
  }

  function clearHandle() {
    if (timer !== null) clearInterval(timer)

  }

  handle()

  timer = setInterval(handle, 1000)
  return {
    cancel: clearHandle
  }
}

function fizzBuzz(num) {
  if (typeof num !== "number" || !num) {
    return false
  }
  var r = ''
  if (num % 3 === 0) {
    r += 'fizz'
  }
  if (num % 5 === 0) {
    r += 'buzz'
  }
  if (r === '') return num
  return r
}

function argsAsArray(fn, arr) {
  return fn.apply(this, arr)
}

function speak(fn, obj) {
  return fn.apply(obj)
}

function functionFunction(str) {
  return function (x) {
    return str + ', ' + x
  }
}

function makeClosures(arr, fn) {
  var r = [],
    i = -1, len = arr.length
  while (++i < len) {
    r.push(fn.bind(null, arr[i]))
  }
  return r
}

function callIt(fn) {
  return fn.apply(this, Array.from(arguments).slice(1))
}

function partialUsingArguments(fn) {
  var args = [].concat(Array.from(arguments)).slice(1)
  var result = function () {
    return fn.apply(this, args.concat(Array.from(arguments)))
  }
  return result
}

var fn = function (a, b, c) {
  return a + b + c
}

function curryIt(fn) {
  var args = [], length = fn.length
  var result = function (n) {
    args.push(n)
    length--
    if (length <= 0) {
      return fn.apply(this, args)
    } else {
      return result
    }
  }
  return result
}

function createModule(str1, str2) {
  var obj = {
    greeting: str1,
    name: str2,
    sayIt: function () {
      return this.greeting + ',' + this.name
    }
  }
  return obj
}


function valueAtBit(num, bit) {
  return num.toString(2).substring(bit - 1, bit)
}

function makeClosures(arr, fn) {
  return arr.map((it) => fn.bind(this, it))
}

console.log(valueAtBit(128, 8))
