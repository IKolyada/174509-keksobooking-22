import {generateAds} from './data.js';
import {createCard} from './card.js';

const mapCanvas = document.querySelector('#map-canvas');
const adsData = generateAds();

mapCanvas.appendChild(createCard(adsData[0]));








