// Get references to DOM elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyPanel = document.getElementById("history-panel");
const historyList = document.getElementById("history-list");
let currentInput = "0";
let history = [];

// Handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = button.textContent;

    if (button.id === "clear") {
      currentInput = "0";
    } 
    else if (button.classList.contains("btn-backspace")) {
      currentInput = currentInput.slice(0, -1) || "0";
    } 
    else if (value === "=") {
      try {
        const result = math.evaluate(currentInput);
        history.push(currentInput + " = " + result);
        currentInput = result.toString();
      } catch {
        currentInput = "Error";
      }
    } 
    else if (button.id === "history-btn") {
      showHistory();
      return;
    } 
    else {
      if (currentInput === "0" || currentInput === "Error") {
        currentInput = value;
      } else {
        currentInput += value;
      }
    }

    display.textContent = currentInput;
    resizeFont();
  });
});

// Adjust font size based on input length
function resizeFont() {
  if (currentInput.length > 14) {
    display.style.fontSize = "28px";
  } else if (currentInput.length > 9) {
    display.style.fontSize = "36px";
  } else {
    display.style.fontSize = "48px";
  }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    if (currentInput === "0" || currentInput === "Error") {
      currentInput = key;
    } else {
      currentInput += key;
    }
  } else if (key === "Enter") {
    try {
      const result = math.evaluate(currentInput);
      history.push(currentInput + " = " + result);
      currentInput = result.toString();
    } catch {
      currentInput = "Error";
    }
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1) || "0";
  } else if (key.toLowerCase() === "c") {
    currentInput = "0";
  } else {
    return; // Ignore unrecognized keys
  }

  display.textContent = currentInput;
  resizeFont();
});

// Show history panel and populate with history
function showHistory() {
  if (history.length === 0) {
    historyList.innerHTML = "<i>No history yet.</i>";
  } else {
    historyList.innerHTML = history.map((item) => `<div class="history-item">${item}</div>`).join("");
  }
  historyPanel.style.display = "flex";
}

// Clear history and update panel
function clearHistory() {
  history = [];
  historyList.innerHTML = "<i>No history yet.</i>";
}

// Hide history panel when clicked anywhere on it
historyPanel.addEventListener("click", () => {
  historyPanel.style.display = "none";
});

// Prevent click inside history list or clear button from closing the panel
historyList.addEventListener("click", (e) => e.stopPropagation());
document.querySelector(".clear-history").addEventListener("click", (e) => e.stopPropagation());

// Initial font size adjustment
resizeFont();
