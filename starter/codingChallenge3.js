'use strict';

let dogsAges = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge = ages => {
  const converted = ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    // if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
    // humanAge = 16 + dogAge * 4
    .filter(humanAge => {
      console.log(humanAge);
      return humanAge > 18;
    })
    // Exclude all dogs that are less than 18 human years old
    .reduce((acc, humanAge, i, arr) => acc + humanAge / arr.length, 0);
  // Calculating the adult ages average

  console.log(converted);
};

console.log(`Original array: ${dogsAges}`);
calcAverageHumanAge(dogsAges);
