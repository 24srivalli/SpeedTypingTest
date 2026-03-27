let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");

let counter = 0;
let counterValue;

function startCounter() {
    counterValue = setInterval(function () {
        counter++;
        timer.textContent = counter;
    }, 1000);
}

function stopCounter() {
    clearInterval(counterValue);
}

function getQuote() {
    spinner.classList.remove("d-none");

    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
            spinner.classList.add("d-none");
            quoteDisplay.textContent = data.content;
        })
        .catch(() => {
            spinner.classList.add("d-none");
            quoteDisplay.textContent = "Failed to load quote";
        });
}

getQuote();
startCounter();

resetBtn.onclick = function () {
    stopCounter();
    counter = 0;
    timer.textContent = 0;
    result.textContent = "";
    quoteInput.value = "";
    getQuote();
    startCounter();
};

submitBtn.onclick = function () {
    if (quoteInput.value.trim().toLowerCase() === quoteDisplay.textContent.trim().toLowerCase()) {
        stopCounter();
        result.textContent = "You typed in " + counter + " seconds";
    } else {
        result.textContent = "You typed incorrect sentence";
    }
};