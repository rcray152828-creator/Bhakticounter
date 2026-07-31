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
const languageSelect = document.getElementById("languageSelect");

const languageData = {
  en: {
    tap: "Tap For Jaap",
    today: "Today's Jaap",
    total: "Total Jaap",
    mala: "Total Mala",
    record: "Daily Record",
    history: "History Days"
  },
  hi: {
    tap: "Jaap Karen",
    today: "Aaj Ka Jaap",
    total: "Kul Jaap",
    mala: "Kul Mala",
    record: "Dainik Record",
    history: "Itihas Din"
  },
  or: {
    tap: "Japa Karantu",
    today: "Aji Ra Japa",
    total: "Mot Japa",
    mala: "Mot Mala",
    record: "Dainika Record",
    history: "Itihasa Dina"
  }
};

languageSelect.addEventListener("change", () => {
  const lang = languageSelect.value;

  tapBtn.textContent = "🧿 " + languageData[lang].tap;
  document.querySelectorAll(".card p")[0].textContent = languageData[lang].today;
  document.querySelectorAll(".card p")[1].textContent = languageData[lang].total;
  document.querySelectorAll(".card p")[2].textContent = languageData[lang].mala;
  document.querySelectorAll(".card p")[3].textContent = languageData[lang].record;
  document.querySelectorAll(".card p")[4].textContent = languageData[lang].history;
});7
function updateUI() {
  count.textContent = total;
  totalEl.textContent = total;
  todayEl.textContent = today;
  malaEl.textContent = Math.floor(total / 108);

  localStorage.setItem("total", total);
  localStorage.setItem("today", today);
// Save today's history
history[todayKey] = today;
localStorage.setItem("history", JSON.stringify(history));

// Save daily record
if (today > dailyRecord) {
  dailyRecord = today;
  localStorage.setItem("dailyRecord", dailyRecord);
}
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
