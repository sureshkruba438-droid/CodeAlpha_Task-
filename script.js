const data = {
    daily: [
        { word: "Hello", meaning: "Hola" },
        { word: "Thank You", meaning: "Gracias" },
        { word: "Please", meaning: "Por favor" },
        { word: "Sorry", meaning: "Lo siento" }
    ],
    food: [
        { word: "Water", meaning: "Agua" },
        { word: "Food", meaning: "Comida" },
        { word: "Rice", meaning: "Arroz" },
        { word: "Milk", meaning: "Leche" }
    ],
    emotion: [
        { word: "Happy", meaning: "Feliz" },
        { word: "Sad", meaning: "Triste" },
        { word: "Angry", meaning: "Enojado" },
        { word: "Love", meaning: "Amor" }
    ]
};

let category = "daily";
let words = data[category];
let index = 0;
let show = false;

// Save progress
function saveProgress() {
    localStorage.setItem("langIndex", index);
    localStorage.setItem("langCategory", category);
}

// Load progress
function loadProgress() {
    category = localStorage.getItem("langCategory") || "daily";
    index = parseInt(localStorage.getItem("langIndex")) || 0;
    document.getElementById("category").value = category;
    words = data[category];
}

// Update card
function updateCard() {
    document.getElementById("word").innerText = words[index].word;
    document.getElementById("meaning").innerText =
        show ? words[index].meaning : "Click show meaning";

    document.getElementById("current").innerText = index + 1;
    document.getElementById("total").innerText = words.length;

    loadQuiz();
    saveProgress();
}

// Show meaning
function showMeaning() {
    show = true;
    updateCard();
}

// Pronunciation
function speakWord() {
    const utter = new SpeechSynthesisUtterance(words[index].word);
    speechSynthesis.speak(utter);
}

// Navigation
function nextWord() {
    show = false;
    index = (index + 1) % words.length;
    updateCard();
}

function prevWord() {
    show = false;
    index = (index - 1 + words.length) % words.length;
    updateCard();
}

// Category change
function changeCategory() {
    category = document.getElementById("category").value;
    words = data[category];
    index = 0;
    show = false;
    updateCard();
}

// Quiz
function loadQuiz() {
    document.getElementById("quizQuestion").innerText =
        "Meaning of '" + words[index].word + "' ?";
    document.getElementById("answer").value = "";
    document.getElementById("result").innerText = "";
}

function checkAnswer() {
    const ans = document.getElementById("answer").value.trim().toLowerCase();
    if (ans === words[index].meaning.toLowerCase()) {
        document.getElementById("result").innerText = "Correct ✅";
    } else {
        document.getElementById("result").innerText =
            "Wrong ❌ Correct: " + words[index].meaning;
    }
}

// Init
loadProgress();
updateCard();