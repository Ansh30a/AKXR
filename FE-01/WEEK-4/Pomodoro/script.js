let timerInterval = null;
let totalSeconds = 1500;
let isRunning = false;
let currentMode = 'pomodoro';

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const modeButtons = document.querySelectorAll('.mode-btn');

const timeModes = {
    pomodoro: 1500,
    short: 300,
    long: 900
};

function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (isRunning) {
        pauseTimer();
        return;
    }
    
    isRunning = true;
    startBtn.textContent = 'pause';
    
    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();
        } else {
            pauseTimer();
            playAlertSound();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    startBtn.textContent = 'start';
    clearInterval(timerInterval);
}

function resetTimer() {
    pauseTimer();
    totalSeconds = timeModes[currentMode];
    updateDisplay();
}

function playAlertSound() {
    const alertSound = new Audio('https://actions.google.com/sounds/v1/alarms/spaceship_alarm.ogg');
    alertSound.play();
}

function switchMode(mode) {
    pauseTimer();
    currentMode = mode;
    totalSeconds = timeModes[mode];
    updateDisplay();
    
    modeButtons.forEach(btn => btn.classList.remove('active'));
    const clickedButton = Array.from(modeButtons).find(btn => btn.getAttribute('data-mode') === mode);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    if (mode === 'short' || mode === 'long') {
        startTimer();
    }
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        switchMode(mode);
    });
});

updateDisplay();
