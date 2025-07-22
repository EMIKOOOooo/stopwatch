let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function startStop() {
    if (timerInterval) {
        // Stop the timer
        clearInterval(timerInterval);
        timerInterval = null;
        startStopBtn.textContent = 'START';
    } else {
        // Start the timer
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
        startStopBtn.textContent = 'STOP';
    }
}

function lap() {
    if (timerInterval) {
        const lapTime = formatTime(elapsedTime);
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapsList.appendChild(listItem);
    }
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    lapCounter = 1;
    display.textContent = formatTime(elapsedTime);
    startStopBtn.textContent = 'START';
    lapsList.innerHTML = '';
}

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);
