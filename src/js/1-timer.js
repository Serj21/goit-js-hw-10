import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');

startButton.disabled = true;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(inputEl, options);

startButton.addEventListener('click', onBtnClick);

function onBtnClick() {
  inputEl.disabled = true;
  startButton.disabled = true;
  const timerInterval = setInterval(() => {
    const currentDate = Date.now();
    let diff = userSelectedDate.getTime() - currentDate;
    console.log(diff);
    const timeRemaining = convertMs(diff);
    const daysValue = leadingZero(timeRemaining.days);
    const hoursValue = leadingZero(timeRemaining.hours);
    const minutesValue = leadingZero(timeRemaining.minutes);
    const secondsValue = leadingZero(timeRemaining.seconds);

    daysElement.textContent = daysValue;
    hoursElement.textContent = hoursValue;
    minutesElement.textContent = minutesValue;
    secondsElement.textContent = secondsValue;

    if (diff <= 1000) {
      inputEl.disabled = false;
      clearInterval(timerInterval);
      iziToast.success({ title: 'Success', message: 'Countdown finished!' });
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function leadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
