import {addPins} from './map.js';
import {getData} from './data.js';
import {checkTime, setFormSubmit} from './form.js';
import {showSuccessMessage, showErrorMessage} from './modal.js';

getData(addPins);

checkTime();

setFormSubmit(showSuccessMessage, showErrorMessage);
