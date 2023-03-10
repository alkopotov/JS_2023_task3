const getSplits = function (str) {
  let res = str;
  for (let i = res.length; i < 16 ; i++){
    res += '-';
  }
  return res;
}
const setRow = function (array) {
return `<tr><td>${array[0].toUpperCase()}</td><td>${array[1].slice(0,4) + ' ' + array[1].slice(4,8) + ' ' + array[1].slice(8,12) + ' ' + array[1].slice(12,16)}</td> <td>${array[2] + '/' + array[3]} </td> <td>${array[4].toUpperCase()}</td></tr>`
}

// !/[^а-яА-Я- ]/.test(name)

console.log(setRow(['Сбербанк', '1234123412341234', '01', '22', 'Иван Иванов']));
const form = document.forms[0];
const bank = form.elements[0];
const cardNumber = form.elements[1];
const valMonth = form.elements[2];
const valYear = form.elements[3];
const holder = form.elements[4];

bank.addEventListener('input', function(e) {
  document.querySelector('.card__bank__res').textContent = e.target.value.toUpperCase();
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
  if ((resVal.includes('') || resVal[1].length < 16)){
    document.querySelector('.direction').textContent ='Введите данные всех полей полностью!'
  } else {
    let table = document.querySelector('.table__res');
  console.log(table);
    if (table) {
      table.innerHTML += setRow(resVal)
    } else {
      table = document.createElement('table');
      table.className = 'table__res'
      table.innerHTML = '<tr><th>Банк</th><th>Номер карты</th><th>Действительна до</th><th>Имя владельца</th></tr>'
      table.innerHTML += setRow(resVal)
      document.body.appendChild(table);
      console.log(false);
    }
    document.querySelector('.direction').textContent = 'Введите данные новой карты'
  }
})