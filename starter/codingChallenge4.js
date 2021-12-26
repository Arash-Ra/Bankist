'use strict';
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//recommendedFood = weight ** 0.75 * 28

// 1. calculating RecommendedFood
// Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)

dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));
console.log(dogs);

//2.Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) 🤓

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

// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)

console.log(
  dogs.some(
    dog => dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9
  )
);

// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)

const [dogEatingOk] = dogs
  .filter(
    dog => dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9
  )
  .flatMap(dog => dog.owners);

console.log(dogEatingOk);

//8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
//     array's objects 😉)

// This will sort the recommended foods in the dogs object
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);

// This will sort the curFood in the dogs object
const dogsSorted1 = dogs.slice().sort((a, b) => a.curFood - b.curFood);
console.log(dogsSorted1);

const arrTest = [11, 5, 2, 3, 7, 6];
console.log(arrTest.sort((a, b) => a - b));
