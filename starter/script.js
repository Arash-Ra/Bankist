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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<div class="movements__value">${mov}€</div>
 </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// const user = 'Steven Thomas Williams'; // user name: stw

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    // %1.2 interest
    // the interest will be added if it is equal and bigger than 1€
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

// it returns first letters of the Username all together

// Event listener
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // prevent form from submitting
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value))
    // console.log('Correct');

    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

  containerApp.style.opacity = 100;
  // clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();

  // Update UI
  updateUI(currentAccount);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movements
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);

    // Clear the input field
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    // Clear the field
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  // This prevents the page to load the form each time click the button
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // This is to empty the field after enteredvalue and transferred amount
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update interface UI

    updateUI(currentAccount);
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Equality
// console.log(movements.includes(200));

// //Condition
// const deposited = movements.some(mov => mov > 200);
// console.log(deposited);
// const movementsUSD = movements.map(function (mov) {
//   return mov * 1.1;
// });

// Every method
// const depositedAll = movements.every(mov => mov > 0);
// console.log(depositedAll);

// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// const movementsUSD1 = movements.map(mov => mov * 1.1);

// console.log(`movementsUSD1= ${movementsUSD1}`);

// console.log('======== %c Map Method ==========', 'color:green');
// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * 1.1);
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map(
//   (mov, i, arr) =>
//     // Turnary condition
//     `Movement ${i + 1}:  You ${mov > 0 ? 'Deposited' : 'Withdrew'} ${Math.abs(
//       mov
//     )} `
// );

// console.log(movementsDescriptions);

// // It returns anything that the return is true
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(deposits);

// another way of filtering the positive amounts in the movements array
// Result: [200, 450, 3000, 70, 1300]
// const depositesFor = [];
// for (const mov of movements) if (mov > 0) depositesFor.push(mov);
// console.log(depositesFor);

// const withdrawals = movements.filter(mov => mov < 0);
// The other way is:
// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });

// console.log(withdrawals);

// Reduce method which returns only one value. It can be sum, max, multiply or so. Whatever we want
// 0 is the accumulator value at the begining
// it is like we put total = 0 at the begining
// const balance = movements.reduce((acc, cur, i) => acc + cur, 0);

// console.log(balance);
// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// const max = movements.reduce(
//   (acc, mov) => (acc > mov ? acc : mov),
//   movements[0]
// );

// console.log(`max = ${max}`);

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(`Firstwithdrawal: ${firstWithdrawal}`);
// find() method returns a value NOT an array
// filter() method returns an array which meets the condition

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// const accountNew = function (accs) {
//   for (const acc of accs) {
//     if (acc.owner === 'Jessica Davis') console.log(acc);
//   }
// };
// If theaccount owner is 'Jessica Davis' then it will print it's object to the console

// accountNew(accounts);

//// Video 162
// Flat method
// The flat method goes one level deep ONLY
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());
// // result: [1, 2, 3, 4, 5, 6, 7, 8]

// const arr1 = [1, 2, 3, 4, 5];
// console.log(...arr1);
// // result: 1 2 3 4 5

// // if we have few nested arrays deep, we can use a parameter in the flat() method to expand the deepest arrays
// const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];
// console.log(arrDeep.flat(1));
// // result: [[1, 2], 3, [4, 5], 6, 7, 8]

// console.log(arrDeep.flat(2));

// // result: [1, 2, 3, 4, 5, 6, 7, 8]

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(`Overal Balanace: ${overalBalance}`);

// const overalBalance1 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(`Overal balance with chaigning, ${overalBalance1}`);
// result: 17400

// flatMap method
// flatMap method goes only one level deep
// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);

//// Video 163
// sort method
// NOTE: the sort method will mutate the original array. So the original array will be changed to sorted one
// const owners = ['Jonas', 'Adam', 'Fernando', 'Sarah'];
// console.log(owners.sort());

// console.log(owners);

// to sort numbers
// return <0, keep order
// return >0 , switch order
// Ascending
// const allMovements1 = allMovements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

// // Descending
// const allMovements2 = allMovements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

// const allMovements2 = allMovements.sort((a, b) => a - b);

// // console.log(allMovements);
// // console.log(allMovements1);
// console.log(allMovements2);

// Video 164
// const arr2 = [1, 2, 3, 4, 5, 6, 7];
// console.log(arr2);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// const x = new Array(7);
// console.log(x);

// x.fill(1);
// console.log(x);

// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
// console.log(z);

// // Exercise: make an array of 100 indexes with dice rolls
// const t = Array.from({ length: 100 }, () => Math.floor(Math.random() * 6 + 1));
// console.log(t);

// If we want to get the movements from the UI

labelBalance.addEventListener('click', function () {
  // 1st way
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // 2nd way
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2.map(el => el.textContent.replace('€', '')));
});
