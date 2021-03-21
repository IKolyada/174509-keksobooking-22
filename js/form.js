import {returnMainPin} from './map.js';
import {sendData} from './data.js';

const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const types = form.querySelector('#type');
const price = form.querySelector('#price');
const address = form.querySelector('#address');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const reset = form.querySelector('.ad-form__reset');


const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

//Title

title.addEventListener('input', () => {
  const titleLength = title.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - titleLength} символов`);
  } else if (titleLength === MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Длина заголовка не может быть больше ${MAX_TITLE_LENGTH} символов`);
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

//Address

const setAddress = (lat, lng) => {
  address.value = `${lat}, ${lng}`;
}

address.setAttribute('readonly', 'readonly');

//Rooms and capacity

for (let guests of capacity) {
  if (!guests.hasAttribute('selected')) {
    guests.disabled = true;
  }
}

rooms.addEventListener('change', (evt) => {
  capacity.value = 1;
  for (let guests of capacity) {
    guests.disabled = false;
    if (guests.value > evt.target.value || guests.value === '0') {
      guests.disabled = true;
    }
  }

  if (evt.target.value === '100') {
    for (let guests of capacity) {
      if (guests.value === '0') {
        guests.disabled = false;
      } else {
        guests.disabled = true;
      }
      capacity.value = 0;
    }
  }
});

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
  price.placeholder = MIN_PRICE[type];
  price.min = MIN_PRICE[type];
});

price.addEventListener('input', () => {
  const userPrice = price.value;

  if (Number(userPrice) < Number(price.min)) {
    price.setCustomValidity(`Минимальная цена для данного типа жилья ${price.min} руб.`);
  } else {
    price.setCustomValidity('');
  }

  if (Number(userPrice) > Number(price.max)) {
    price.setCustomValidity(`Максимальная цена не может превышать ${price.max} руб.`)
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
});

//Reset

const resetForm = () => {
  form.reset();
  returnMainPin();
}

reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

//Send form

const setFormSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

export {checkTime, setAddress, setFormSubmit, resetForm};
