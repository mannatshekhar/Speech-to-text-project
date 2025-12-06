// Speech API
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;

// DOM elements
const output = document.getElementById("output");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const status = document.getElementById("status");
const count = document.getElementById("count");
const themeToggle = document.getElementById("themeToggle");

// Update word count
function updateWordCount() {
    const words = output.value.trim().split(/\s+/).filter(w => w.length);
    count.textContent = "Words: " + words.length;
}

// Start Recognition
startBtn.addEventListener("click", () => {
    recognition.start();
    status.textContent = "● Listening...";
    status.style.color = "#ff4d4d";
});

// Stop Recognition
stopBtn.addEventListener("click", () => {
    recognition.stop();
    status.textContent = "● Not Listening";
    status.style.color = "#444";
});

// Clear Text
clearBtn.addEventListener("click", () => {
    output.value = "";
    updateWordCount();
});

// Download text
saveBtn.addEventListener("click", () => {
    const blob = new Blob([output.value], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "speech_note.txt";
    link.click();
});

// Speech results
recognition.onresult = (e) => {
    const text = e.results[e.resultIndex][0].transcript;
    output.value += text + " ";
    output.scrollTop = output.scrollHeight;
    updateWordCount();
};

// Dark Mode Toggle
themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});
