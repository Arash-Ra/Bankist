'use strict';
// let juliaData = [3, 5, 2, 12, 7];
// let kateData = [4, 1, 15, 8, 3];

const checkDos = function (dogsJulia, dogsKate) {
  const juliaPureData = dogsJulia.splice(1);
  console.log(juliaPureData);
  let juliaNew = juliaPureData.slice(0, 2);
  console.log(juliaNew);
  let final = juliaNew.concat(dogsKate);
  console.log(final);

  final.forEach(function (dogAge, i) {
    if (dogAge >= 3)
      console.log(`Dog number ${i + 1} is an adult and is ${dogAge} years old`);
    else console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  });
};

checkDos([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
