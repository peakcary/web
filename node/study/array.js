// var LIMIT = 10000000;
// var arr = new Array(LIMIT);
// console.time("Array insertion time");
// for (var i = 0; i < LIMIT; i++) {
//     arr[i] = i;
// }
// console.timeEnd("Array insertion time");

// var LIMIT = 10000000;
// var buffer = new ArrayBuffer(LIMIT * 4);
// var arr = new Int32Array(buffer);
// console.time("ArrayBuffer insertion time");
// for (var i = 0; i < LIMIT; i++) {
//     arr[i] = i;
// }
// console.timeEnd("ArrayBuffer insertion time");

console.log('\x1b[36m%s\x1b[34m%s\x1b[0m', 'I am cyan','i am blue');
console.log("\x1b[33m%s\x1b[0m" ,"I Am Using Yellow");
console.log("\x1b[44m%s\x1b[0m" ,"Background Color Is Blue");



 
var colors = require('colors');
 
console.log('i am black'.bgBlack);
console.log('i am red'.bgRed);
console.log('i am green'.bgGreen);
console.log('i am black'.bgYellow);
console.log('i am blue'.bgBlue);
console.log('i am magenta'.bgMagenta);
console.log('i am cyan'.bgCyan);
console.log('i am white'.bgWhite);