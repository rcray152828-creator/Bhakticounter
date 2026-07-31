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
const dailyRecordEl = document.getElementById("dailyRecord");
const historyDaysEl = document.getElementById("historyDays");

const tapBtn = document.getElementById("tapBtn");
const mantraText = document.getElementById("mantraText");
const mantraSelect = document.getElementById("mantraSelect");
const languageSelect = document.getElementById("languageSelect");

// ===============================
// MANTRA DATA
// ===============================

const mantraData = {
  en: [
    "🙏 Jai Jagannath",
    "🌸 Radhe Radhe",
    "🕉 Om Namah Shivaya",
    "🪷 Hare Krishna",
    "🚩 Jai Shri Ram"
  ],

  hi: [
    "🙏 जय जगन्नाथ",
    "🌸 राधे राधे",
    "🕉 ॐ नमः शिवाय",
    "🪷 हरे कृष्ण",
    "🚩 जय श्री राम"
  ],

  or: [
    "🙏 ଜୟ ଜଗନ୍ନାଥ",
    "🌸 ରାଧେ ରାଧେ",
    "🕉 ଓଁ ନମଃ ଶିବାୟ",
    "🪷 ହରେ କୃଷ୍ଣ",
    "🚩 ଜୟ ଶ୍ରୀରାମ"
  ]
};

// ===============================
// LANGUAGE DATA
// ===============================

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

// ===============================
// LANGUAGE CHANGE
// ===============================

function changeLanguage() {
  const lang = languageSelect.value;

  tapBtn.textContent = "🧿 " + languageData[lang].tap;

  const cards = document.querySelectorAll(".card p");

  if (cards.length >= 5) {
    cards[0].textContent = languageData[lang].today;
    cards[1].textContent = languageData[lang].total;
    cards[2].textContent = languageData[lang].mala;
    cards[3].textContent = languageData[lang].record;
    cards[4].textContent = languageData[lang].history;
  }

  // Change mantra dropdown according to language
  mantraSelect.innerHTML = "";

  mantraData[lang].forEach((mantra) => {
    const option = document.createElement("option");
    option.value = mantra;
    option.textContent = mantra;
    mantraSelect.appendChild(option);
  });

  mantraText.textContent = mantraData[lang][0];
}

if (languageSelect) {
  languageSelect.addEventListener("change", changeLanguage);
}

// ===============================
// UPDATE COUNTER
// ===============================

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

  if (dailyRecordEl) {
    dailyRecordEl.textContent = dailyRecord;
  }

  if (historyDaysEl) {
    historyDaysEl.textContent = Object.keys(history).length;
  }
}

// ===============================
// TAP BUTTON
// ===============================

tapBtn.addEventListener("click", () => {
  total++;
  today++;

  updateUI();

  // Bell Sound
  const bell = document.getElementById("bellSound");

  if (bell) {
    bell.currentTime = 0;
    bell.play().catch(() => {});
  }

  // Vibration
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  // 108 Jaap Alert
  if (total % 108 === 0) {
    alert("🎉 Congratulations! 108 Jaap Completed 🙏");
  }
});

// ===============================
// MANTRA CHANGE
// ===============================

mantraSelect.addEventListener("change", () => {
  mantraText.textContent = mantraSelect.value;
});

// ===============================
// RESET
// ===============================

function resetData() {
  if (confirm("Reset all Jaap?")) {
    total = 0;
    today = 0;

    updateUI();
  }
}

// ===============================
// THEME
// ===============================

function toggleTheme() {
  document.body.classList.toggle("dark");
}

// ===============================
// SHARE
// ===============================

function shareResult() {
  if (navigator.share) {
    navigator.share({
      title: "BhaktiCounter",
      text: `🙏 I completed ${total} Jaap.`,
      url: location.href
    }).catch(() => {});
  } else {
    alert("Share is not supported on this device.");
  }
}

// ===============================
// DATE
// ===============================

const date = new Date();

const currentDate = document.getElementById("currentDate");

if (currentDate) {
  currentDate.textContent = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// ===============================
// START APP
// ===============================

updateUI();

if (languageSelect) {
  changeLanguage();
}
