import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('promiseForm');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadioButtons = form.querySelectorAll('input[name="state"]');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(delayInput.value);
  let state = '';
  stateRadioButtons.forEach(radio => {
    if (radio.checked) {
      state = radio.value;
    }
  });

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: '✅ Fulfilled promise',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Rejected promise',
        message: `Rejected promise in ${delay}ms`,
      });
    });
});
