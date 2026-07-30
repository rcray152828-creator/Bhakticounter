let count = 0;
let total = 0;
let today = 0;

const countEl = document.getElementById("count");
const malaEl = document.getElementById("mala");
const totalEl = document.getElementById("total");
const todayEl = document.getElementById("today");
const btn = document.getElementById("jaapBtn");

btn.addEventListener("click", function () {
    count++;
    total++;
    today++;

    countEl.innerText = count;
    totalEl.innerText = total;
    todayEl.innerText = today;
    malaEl.innerText = Math.floor(total / 108);
});
