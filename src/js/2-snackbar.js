console.log(5);
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('promiseForm');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadioButtons = form.querySelectorAll('input[name="state"]');

// Додавання обробника події submit до форми
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Зупинка дії форми за замовчуванням

  // Отримання значень з форми
  const delay = parseInt(delayInput.value);
  let state = '';
  stateRadioButtons.forEach(radio => {
    if (radio.checked) {
      state = radio.value;
    }
  });

  // Створення нового промісу
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // Виконання промісу з вказаною затримкою
      } else {
        reject(delay); // Відхилення промісу з вказаною затримкою
      }
    }, delay);
  });

  // Обробка результатів промісу
  promise
    .then(delay => {
      // Виведення повідомлення про вдале виконання промісу
      iziToast.success({
        title: '✅ Fulfilled promise',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      // Виведення повідомлення про невдале виконання промісу
      iziToast.error({
        title: '❌ Rejected promise',
        message: `Rejected promise in ${delay}ms`,
      });
    });
});
