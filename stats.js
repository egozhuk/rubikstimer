const timeData = JSON.parse(localStorage.getItem("timeData"));

const times = timeData.map((data) => data.time);
const labels = timeData.map((data, index) => index + 1);

const ctx = document.getElementById("myChart").getContext("2d");
const chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "Времена сборок",
            data: times,
            borderColor: "#f44336",
            backgroundColor: "rgba(244, 67, 54, 0.2)",
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return value.toFixed(1);
                    }
                }
            }]
        }
    }
});

function deleteTime(index) {
    const timeData = JSON.parse(localStorage.getItem("timeData")) || [];
    timeData.splice(index, 1);
    localStorage.setItem("timeData", JSON.stringify(timeData));
    location.reload();
    updateChart();
}

const deleteTimeButton = document.getElementById("delete-time-button");
deleteTimeButton.addEventListener("click", () => {
    const index = prompt("Введите индекс времени, которое нужно удалить:");
    if (index !== null) {
        deleteTime(index - 1);
    }
});

const mainMenuButton = document.getElementById("main-menu-button");
mainMenuButton.addEventListener("click", () => {
    window.location.href = "index.html";
});