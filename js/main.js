import {generateAds} from './data.js';
import {createCard} from './card.js';
import {onChangeTime, timein, timeout} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');
const adsData = generateAds();

mapCanvas.appendChild(createCard(adsData[0]));

onChangeTime(timein);
onChangeTime(timeout);
