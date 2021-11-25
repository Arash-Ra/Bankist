'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<div class="movements__value">${mov}</div>
 </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

// const user = 'Steven Thomas Williams'; // user name: stw

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const calcDisplayBalance = function (movemements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    // %1.2 interest
    // the interest will be added if it is equal and bigger than 1€
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

// it returns first letters of the Username all together

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Video 141
// let arr = ['a', 'b', 'c', 'd', 'e'];

// // Slice method
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));

// // last element of the array
// console.log(arr.slice(-1));

// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// // Splice
// console.log('Using Splice(2):');
// console.log(arr.splice(2));
// console.log(arr);

// // Reverse
// arr = ['a', 'b', 'c', 'd', 'e'];
// let arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());

// // Concat
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // Join
// console.log(letters.join(' - '));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(`------- FOR OF -------`);
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`${i + 1}: You deposited ${movement}`);
//   } else console.log(`${i + 1}: You withdrew ${Math.abs(movement)}`);
// }

// // If we want to break the loop we need to use for of
// // We cannot break the forEach loop

// console.log(`------- FOREACH method-------`);

// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`${i + 1}: You deposited ${mov}`);
//   } else console.log(`${i + 1}: You withdrew ${Math.abs(mov)}`);
// });

// // Map

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(` ${key}: ${value}`);
// });

// // Set

// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, key) {
//   console.log(`${key}: ${value}`);
// });

// Video 148 Map method
// Map method mackes an array and does the function we want, it does not change the original array
// it works like forEach method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementsUSD = movements.map(function (mov) {
  return mov * 1.1;
});

const movementsUSD1 = movements.map(mov => mov * 1.1);

console.log(`movementsUSD1= ${movementsUSD1}`);

console.log('======== %c Map Method ==========', 'color:green');
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * 1.1);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i, arr) =>
    // Turnary condition
    `Movement ${i + 1}:  You ${mov > 0 ? 'Deposited' : 'Withdrew'} ${Math.abs(
      mov
    )} `
);

console.log(movementsDescriptions);

// It returns anything that the return is true
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposits);

// another way of filtering the positive amounts in the movements array
// Result: [200, 450, 3000, 70, 1300]
const depositesFor = [];
for (const mov of movements) if (mov > 0) depositesFor.push(mov);
console.log(depositesFor);

const withdrawals = movements.filter(mov => mov < 0);
// The other way is:
// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });

console.log(withdrawals);

// Reduce method which returns only one value. It can be sum, max, multiply or so. Whatever we want
// 0 is the accumulator value at the begining
// it is like we put total = 0 at the begining
const balance = movements.reduce((acc, cur, i) => acc + cur, 0);

console.log(balance);
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);

console.log(`max = ${max}`);

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(`Firstwithdrawal: ${firstWithdrawal}`);
// find() method returns a value NOT an array
// filter() method returns an array which meets the condition

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

const accountNew = function (accs) {
  for (const acc of accs) {
    if (acc.owner === 'Jessica Davis') console.log(acc);
  }
};
// If theaccount owner is 'Jessica Davis' then it will print it's object to the console

accountNew(accounts);
