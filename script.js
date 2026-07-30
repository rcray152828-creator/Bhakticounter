let count = Number(localStorage.getItem("count")) || 0;
let total = Number(localStorage.getItem("total")) || 0;
let today = Number(localStorage.getItem("today")) || 0;

const countEl = document.getElementById("count");
const malaEl = document.getElementById("mala");
const totalEl = document.getElementById("total");
const todayEl = document.getElementById("today");
const btn = document.getElementById("jaapBtn");

function update() {
  countEl.innerText = count;
  totalEl.innerText = total;
  todayEl.innerText = today;
  malaEl.innerText = Math.floor(total / 108);

  localStorage.setItem("count", count);
  localStorage.setItem("total", total);
  localStorage.setItem("today", today);
}

update();

btn.addEventListener("click", () => {
  count++;
  total++;
  today++;

  if (navigator.vibrate) {
    navigator.vibrate(40);
  }

  update();

  if (total % 108 === 0) {
    alert("🎉 Radhe Radhe!\n1 Mala Complete 🙏");
  }
});
const currentDate = new Date();
const dateElement = document.getElementById("currentDate");

if (dateElement) {
  dateElement.innerText = currentDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
