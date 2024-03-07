import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
console.log(5);

const startButton = document.querySelector(`#startButton`);
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
let datetimePicker;

startButton.addEventListener('click', onBtnClick);
function onBtnClick() {
  const userSelectedDate = datetimePicker.selectedDates[0];
  const currentDate = new Date();
  const datedifference = userSelectedDate.getTime() - currentDate.getTime();
  const timerInterval = setInterval(() => {
    const timeRemaining = convertMs(datedifference); //
    const daysValue = leadingZero(timeRemaining.days);
    const hoursValue = leadingZero(timeRemaining.hours);
    const minutesValue = leadingZero(timeRemaining.minutes);
    const secondsValue = leadingZero(timeRemaining.seconds);

    daysElement.textContent = daysValue;
    hoursElement.textContent = hoursValue;
    minutesElement.textContent = minutesValue;
    secondsElement.textContent = secondsValue;

    if (datedifference <= 0) {
      clearInterval(timerInterval);
      iziToast.success({ title: 'Success', message: 'Countdown finished!' });
    }
    datedifference -= 1000;
  }, 1000);
  startButton.disabled = true;
  datetimePicker.destroy();
}

function initializeTimer() {
  datetimePicker = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    onClose: function (selectedDates) {
      const userSelectedDate = selectedDates[0];
      const currentDate = new Date();
      if (userSelectedDate <= currentDate) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  });
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
initializeTimer();
