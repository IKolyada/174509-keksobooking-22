import {generateAds} from './data.js';
import {checkTime} from './form.js';
import {addPins} from './map.js';

const adsData = generateAds();

checkTime();
addPins(adsData);

