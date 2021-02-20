const generateRandomInt = (min, max) => {
  if (min >= 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  throw new Error('Ошибка выполнения');
};


const generateRandomNum = (min, max, decimal) => {
  if (min >= 0 && min < max) {
    const randomNumber = Math.random() * (max - min + 1) + min;
    return randomNumber.toFixed(decimal);
  }
  throw new Error('Ошибка выполнения');
};

export {generateRandomInt, generateRandomNum};
