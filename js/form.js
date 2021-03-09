import {MINPRICE} from './data.js';

const form = document.querySelector('.ad-form');
const types = form.querySelector('#type');
const price = form.querySelector('#price');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');

//Checktime

const onChangeTime = (time) => {
  time.addEventListener('change', (evt) => {
    timein.value = evt.target.value;
    timeout.value = evt.target.value;
  })
}

//Price

types.addEventListener('change', (evt) => {
  const type = evt.target.value;
  price.placeholder = MINPRICE[type];
  price.min = MINPRICE[type];
});

price.addEventListener('input', () => {
  const userPrice = price.value;

  if (Number(userPrice) < Number(price.min)) {
    price.setCustomValidity(`Минимально возможная цена для данного типа жилья ${price.min} руб.`);
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
})

export {onChangeTime, timein, timeout}
