/* ---------------- // * used '$' as prefix for DOM variables --------------- */

'use strict';

const $balanceDisplay = document.querySelector('#balance');
const $incomeDisplay = document.querySelector('#income');
const $expenseDisplay = document.querySelector('#expense');

const $transactionsCol = document.querySelector('#transactions-col');

const $addExpenseForm = document.querySelector('form');
const $addExpenseBtn = document.querySelector('#add-expense-btn');
const $formOverlay = document.querySelector('.form-overlay');
const $formCancelBtn = document.querySelector('#form__cancel-btn');
// const $formAddBtn = document.querySelector('#form__add-btn'); /* // *unused */

const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
}).format;

const transactions = [
  /*   {
    name: 'Name1',
    amount: 100,
    type: 'income',
  },
  {
    name: 'Name2',
    amount: 50,
    type: 'expense',
  }, */
];

let income = 0;
let expense = 0;
// let balance = income - expense;

transactions.forEach((v) => {
  updateNumbers(v);
  updateDisplays();
});

transactions.forEach((v) => {
  render(v);
});

{
  /* ---------------------------------- test ---------------------------------- */
  /* const $tr = document.querySelector('.transaction');
  
  for (let i = 1; i <= 20; i++) {
    const clone = $tr.cloneNode(true);
  
    if (Math.random() < 0.5) {
      clone.classList.toggle('income');
      clone.classList.toggle('expense');
    }
  
    $transactionsCol.appendChild(clone);
  } */
  /* -------------------------------- test end -------------------------------- */
}

[$addExpenseBtn, $formCancelBtn].forEach((elem) => {
  elem.addEventListener('click', (e) => {
    $formOverlay.classList.toggle('active');
  });
});

function render(transactionOBJ) {
  const { type, name, amount } = transactionOBJ;

  $transactionsCol.insertAdjacentHTML(
    'beforeend',
    `<li class="transaction ${type}">
        <div class="transaction__name">${name}</div>
        <span class="transaction__amount">${currencyFormatter(amount)}</span>
      </li>`
  );
}

function updateNumbers(transactionOBJ) {
  const v = transactionOBJ;
  switch (v.type) {
    case 'income':
      income += v.amount;
      break;

    case 'expense':
      expense += v.amount;
      break;

    default:
      console.log('transactions loop; type is:' + v.type);
      break;
  }
}

function updateDisplays() {
  $balanceDisplay.innerText = currencyFormatter(income - expense);
  $incomeDisplay.innerText = currencyFormatter(income);
  $expenseDisplay.innerText = '-' + currencyFormatter(expense);
}

$addExpenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData($addExpenseForm));
  formData.amount = parseInt(formData.amount); // * turning amount 'string' into 'number'
  // $addExpenseForm.reset();
  $formOverlay.classList.toggle('active');

  transactions.push(formData);
  updateNumbers(formData);
  updateDisplays();
  render(formData);
});
