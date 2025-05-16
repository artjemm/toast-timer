const options = document.querySelectorAll(".toast-option");
const startScreen = document.querySelector(".start-screen");
const selectionScreen = document.querySelector(".selection-screen");
const timerScreen = document.querySelector(".timer-screen");

const timerDisplay = document.getElementById("timer");
const toastImg = document.getElementById("toast-img");
const toastLabel = document.getElementById("toast-label");

let timerInterval;

// Alterna entre telas
function switchScreen(target) {
  [startScreen, selectionScreen, timerScreen].forEach((screen) =>
    screen.classList.remove("active")
  );
  target.classList.add("active");
}

// Botão de início
function goToSelection() {
  switchScreen(selectionScreen);
}

// Botão de voltar
function goBack() {
  clearInterval(timerInterval);
  switchScreen(selectionScreen);
}

// Inicia o timer
function startTimerWithOption(option) {
  const minutes = parseInt(option.dataset.minutes);
  const imgSrc = option.dataset.img;

  toastImg.src = imgSrc;
  toastLabel.textContent = "your toast is ready in..";

  let totalSeconds = minutes * 60;
  updateTimerDisplay(totalSeconds);

  switchScreen(timerScreen);

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    totalSeconds--;
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Done!";
    } else {
      updateTimerDisplay(totalSeconds);
    }
  }, 1000);
}

// Atualiza o texto do timer
function updateTimerDisplay(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  timerDisplay.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
}

// Adiciona os eventos às opções de toast
options.forEach((option) => {
  option.addEventListener("click", () => startTimerWithOption(option));
});

// Expondo globalmente os botões inline do HTML
window.goToSelection = goToSelection;
window.goBack = goBack;
