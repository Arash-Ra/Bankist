'use strict';
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//recommendedFood = weight ** 0.75 * 28

// 1. calculating RecommendedFood
dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));
console.log(dogs);

//2.
// Way No.1
dogs.forEach(dog => {
  if (dog.owners.includes('Sarah'))
    console.log(dog.curFood > dog.recFood ? 'Too Much' : 'Too little');
});

// Way No.2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);
// console.log(dogSarah);

//3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').

let ownersEatTooMuch = [];
let ownersEatTooLittle = [];

// dogs.map(dog =>
//   dog.curFood > dog.recFood
//     ? ownersEatTooMuch.push(dog.owners)
//     : ownersEatTooLittle.push(dog.owners)
// );
// console.log(`ownersEatTooMuch: ${ownersEatTooMuch}`);
// console.log(`ownersEatTooLittle: ${ownersEatTooLittle}`);

// 2nd way
ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);

ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

console.log(`ownersEatTooMuch: ${ownersEatTooMuch}`);
// result: ownersEatTooMuch: Matilda,Sarah,John

console.log(`ownersEatTooLittle: ${ownersEatTooLittle}`);
// result ownersEatTooLittle: Alice,Bob,Michael

// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));
