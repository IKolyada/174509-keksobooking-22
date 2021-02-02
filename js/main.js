let generateRandomInt = (min, max) => {
  if (min < 0 || min >= max) {
    return alert('Введите корректный диапазон чисел');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// формулу взяла здесь https://puzzleweb.ru/javascript/math_random.php, почему она такая разобрала)

generateRandomInt();

let generateRandomNum = (min, max, decimal) => {
  if (min < 0) {
    min = -min;
  }
  if (max < 0){
    max = -max;
  }
  if (min >= max) {
    max += min;
  }

  let randomNumber = Math.random() * (max - min + 1) + min;
  return randomNumber.toFixed(decimal);
};

generateRandomNum();
