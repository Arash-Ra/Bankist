'use strict';

let dogsAges = [2, 3, 4, 1];
let dogInHumanAge = dogsAges.map(function (dgAge) {
  if (dgAge <= 2) {
    return dgAge * 2;
  } else {
    return dgAge * 4;
  }
});

console.log(`Original array: ${dogsAges}`);
console.log(`Converted to human age: ${dogInHumanAge}`);
