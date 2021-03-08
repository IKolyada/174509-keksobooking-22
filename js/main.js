import {generateAds} from './data.js';
import {createCard} from './card.js';
import {setTime, timein, timeout} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');
const adsData = generateAds();

mapCanvas.appendChild(createCard(adsData[0]));

setTime(timein);
setTime(timeout);
