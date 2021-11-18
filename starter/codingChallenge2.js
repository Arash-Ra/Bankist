'use strict';

let dogsAges = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge = function (ages) {
  const converted = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
  console.log(converted);

  // Excluding the ages below 18
  const adult = converted.filter(age1 => age1 > 18);
  console.log(adult);

  // Calculating the adult ages average
  // Average
  const avg = adult.reduce((acc, age) => acc + age, 0) / adult.length;
  console.log(avg);
};

console.log(`Original array: ${dogsAges}`);
calcAverageHumanAge(dogsAges);
