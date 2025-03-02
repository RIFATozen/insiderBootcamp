const timeInput = document.getElementById("timeInput");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const display = document.getElementById("display");

let countdownInterval;
let timeLeft;

let formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

let startCountdown = () => {
  clearInterval(countdownInterval);

  const inputTime = parseInt(timeInput.value);

  if (!inputTime || inputTime <= 0) {
    alert("Lütfen geçerli bir saniye değeri giriniz!");
    return;
  }

  timeLeft = inputTime;
  display.textContent = formatTime(timeLeft);

  timeInput.disabled = true;
  startBtn.disabled = true;

  countdownInterval = setInterval(() => {
    timeLeft--;
    display.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      display.textContent = "Süre doldu!";
      timeInput.disabled = false;
      startBtn.disabled = false;
    }
  }, 1000);
};

let resetCountdown = () => {
  clearInterval(countdownInterval);
  timeInput.disabled = false;
  startBtn.disabled = false;
  timeInput.value = "";
  display.textContent = "00:00";
};

let alertBox = (e) => {
  if (
    e.key.match(/[a-zA-Z]/) &&
    !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)
  ) {
    alert("Bu alana sadece sayılar girilebilir!");
  }
};

startBtn.addEventListener("click", startCountdown);
resetBtn.addEventListener("click", resetCountdown);
timeInput.addEventListener("keydown", alertBox);
