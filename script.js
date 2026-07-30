let total = Number(localStorage.getItem("total")) || 0;
let today = Number(localStorage.getItem("today")) || 0;
// Daily Record & History
let history = JSON.parse(localStorage.getItem("history")) || {};
let dailyRecord = Number(localStorage.getItem("dailyRecord")) || 0;

const todayKey = new Date().toISOString().split("T")[0];
const count = document.getElementById("count");
const totalEl = document.getElementById("total");
const todayEl = document.getElementById("today");
const malaEl = document.getElementById("mala");
const tapBtn = document.getElementById("tapBtn");
const mantraText = document.getElementById("mantraText");
const mantraSelect = document.getElementById("mantraSelect");

function updateUI() {
  count.textContent = total;
  totalEl.textContent = total;
  todayEl.textContent = today;
  malaEl.textContent = Math.floor(total / 108);

  localStorage.setItem("total", total);
  localStorage.setItem("today", today);
}

updateUI();

tapBtn.addEventListener("click", () => {
  total++;
  today++;
  updateUI();
const bell = document.getElementById("bellSound");
if (bell) {
  bell.currentTime = 0;
  bell.play().catch(() => {});
}
  if (navigator.vibrate) navigator.vibrate(50);

  if (total % 108 === 0) {
    alert("🎉 Congratulations! 108 Jaap Completed 🙏");
  }
});

mantraSelect.addEventListener("change", () => {
  mantraText.textContent = mantraSelect.value;
});

function resetData() {
  if (confirm("Reset all Jaap?")) {
    total = 0;
    today = 0;
    updateUI();
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function shareResult() {
  if (navigator.share) {
    navigator.share({
      title: "BhaktiCounter",
      text: `🙏 I completed ${total} Jaap.`,
      url: location.href
    });
  } else {
    alert("Share is not supported on this device.");
  }
}

const date = new Date();
document.getElementById("currentDate").textContent =
date.toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric"
});
