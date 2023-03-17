const getSplits = function (str) {
  let res = str;
  for (let i = res.length; i < 16 ; i++){
    res += '-';
  }
  return res;
}
const setRow = function (array) {
let sys = ''
switch (array[1]) {
  case "1":
    sys = "МИР";
    break;
  case "2":
    sys = "VISA";
    break;
  case "3":
    sys = "MASTERCARD";
    break;
  case "4":
    sys = "UNIONPAY";
    break;
}
return `<tr><td>${array[0].toUpperCase()}</td><td>${sys}</td><td>${array[2].slice(0,4) + ' ' + array[2].slice(4,8) + ' ' + array[2].slice(8,12) + ' ' + array[2].slice(12,16)}</td> <td>${array[3] + '/' + array[4]} </td> <td>${array[5].toUpperCase()}</td></tr>`
}

const form = document.forms[0];
const bank = form.elements[0];
const logo = form.elements[1];
logo.value = '';
const cardNumber = form.elements[2];
const valMonth = form.elements[3];
valMonth.value = '';
const valYear = form.elements[4];
valYear.value = '';
const holder = form.elements[5];
const pict_logo = document.querySelector('.logo');

bank.addEventListener('input', function(e) {
  document.querySelector('.card__bank__res').textContent = e.target.value.toUpperCase();
})

logo.addEventListener('change', function(e) {
  switch (e.target.value) {
    case "1":
      pict_logo.className = 'mir';
      break;
    case "2":
      pict_logo.className = 'visa';
      break;
    case "3":
      pict_logo.className = 'mcard';
      break;
    case "4":
      pict_logo.className = 'upay';
      break;
  }
})

cardNumber.addEventListener('input', function(e){
  if (/[^0-9]/.test(e.target.value[e.target.value.length - 1])) {
    e.target.value = e.target.value.slice(0, e.target.value.length - 1)
  }
  let numberToDisplay = getSplits(e.target.value);
  document.querySelector('.card__num__res1').textContent = numberToDisplay.slice(0,4);
  document.querySelector('.card__num__res2').textContent = numberToDisplay.slice(4,8);
  document.querySelector('.card__num__res3').textContent = numberToDisplay.slice(8,12);
  document.querySelector('.card__num__res4').textContent = numberToDisplay.slice(12,16);
})

valMonth.addEventListener('change', function(e) {
  document.querySelector('.card__valid__res__month').textContent = e.target.value;
})


valYear.addEventListener('change', function(e){
  document.querySelector('.card__valid__res__year').textContent = e.target.value;
})

holder.addEventListener('input', function(e) {
  if (/[^a-zA-Zа-яA-Я ]/.test(e.target.value[e.target.value.length - 1])) {
    e.target.value = e.target.value.slice(0, e.target.value.length - 1)
  }
  document.querySelector('.card__holder__res').textContent = e.target.value.toUpperCase();
})


form.addEventListener('submit', function(e) {
  e.preventDefault();
  let resVal = []
  for (let j = 0; j < this.elements.length - 1; j++) {
    resVal.push(this.elements[j].value)
  }
  if ((resVal.includes('') || resVal[2].length < 16)){
    document.querySelector('.direction').textContent ='Введите данные всех полей полностью!'
  } else {
    let table = document.querySelector('.table__res');
    if (table) {
      table.innerHTML += setRow(resVal)
    } else {
      table = document.createElement('table');
      table.className = 'table__res'
      table.innerHTML = '<tr><th>Банк</th><th>Система</th><th>Номер карты</th><th>Действительна до</th><th>Имя владельца</th></tr>'
      table.innerHTML += setRow(resVal)
      document.body.appendChild(table);
    }
    document.querySelector('.direction').textContent = 'Введите данные новой карты'
    for (el in this.elements) {
      this.elements[el].value = '';
    }
    document.querySelector('.card__num__res1').textContent = '----';
    document.querySelector('.card__num__res2').textContent = '----';
    document.querySelector('.card__num__res3').textContent = '----';
    document.querySelector('.card__num__res4').textContent = '----';
    document.querySelector('.card__valid__res__month').textContent = '--';
    document.querySelector('.card__valid__res__year').textContent = '--';
    document.querySelector('.card__holder__res').textContent = 'CARDHOLDER';
    document.querySelector('.card__bank__res').textContent = 'ISSUED BY';
    pict_logo.className = 'logo';
  }
})