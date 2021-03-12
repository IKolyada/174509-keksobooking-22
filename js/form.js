import {MINPRICE} from './data.js';
import {setAddress} from './map.js';

const form = document.querySelector('.ad-form');
const types = form.querySelector('#type');
const price = form.querySelector('#price');
const address = form.querySelector('#address');

//Address

setAddress(address);

//Checktime

const checkTime = () => {
  const timein = form.querySelector('#timein');
  const timeout = form.querySelector('#timeout');

  const setTime = (time) => {
    time.addEventListener('change', (evt) => {
      timein.value = evt.target.value;
      timeout.value = evt.target.value;
    })
  }
  setTime(timein);
  setTime(timeout);
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

export {checkTime, address}
