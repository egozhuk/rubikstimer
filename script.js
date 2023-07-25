if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
            console.log('Service Worker зарегистрирован:', registration);
        })
        .catch((error) => {
            console.error('Ошибка регистрации Service Worker:', error);
        });
}

const wakeLock = await navigator.wakeLock.request('screen');

wakeLock.addEventListener('release', () => {
    console.log('Wake Lock был освобожден');
});

const startStopTimerButton = document.getElementById("startStopTimer");
const showStatsButton = document.getElementById("showStats");
let startTime = null;
let intervalId = null;
let isTimerRunning = false;

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor(time / 1000) % 60;
    const milliseconds = Math.floor(time % 1000 / 10);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}.${milliseconds < 10 ? "0" : ""}${milliseconds}`;
}

function startTimer() {
    startTime = performance.now();
    intervalId = setInterval(() => {
        const timeElapsed = performance.now() - startTime;
        startStopTimerButton.textContent = formatTime(timeElapsed);
    }, 100);
    isTimerRunning = true;
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
    isTimerRunning = false;
    const time = performance.now() - startTime;
    const date = new Date();
    const shouldSave = confirm("Хотите сохранить это время?");
    if (shouldSave) {
        const timeData = JSON.parse(localStorage.getItem("timeData")) || [];
        timeData.push({ time, date });
        localStorage.setItem("timeData", JSON.stringify(timeData));
    }
}

showStatsButton.textContent = "Статистика";
showStatsButton.addEventListener("click", () => {
    window.location.href = "stats.html";
});

startStopTimerButton.addEventListener("mousedown", () => {
    if (!isTimerRunning) {
        startStopTimerButton.classList.add("red-button");
    }
});

startStopTimerButton.addEventListener("mouseup", () => {
    if (!isTimerRunning) {
        startStopTimerButton.classList.remove("red-button");
        startTimer();
    } else {
        startStopTimerButton.classList.remove("red-button");
        stopTimer();
    }
});

startStopTimerButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    if (!isTimerRunning) {
        startStopTimerButton.classList.add("red-button");
    }
});

startStopTimerButton.addEventListener("touchend", (event) => {
    event.preventDefault();
    if (!isTimerRunning) {
        startStopTimerButton.classList.remove("red-button");
        startTimer();
    } else {
        startStopTimerButton.classList.remove("red-button");
        stopTimer();
    }
});