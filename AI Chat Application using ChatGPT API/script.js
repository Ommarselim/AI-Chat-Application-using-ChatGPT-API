document.getElementById("submit-btn").addEventListener("click", function () {
  sendToChatGPT();
});

document.getElementById("clear-btn").addEventListener("click", function () {
  document.getElementById("word-input").value = "";
  document.getElementById("reply-content").textContent =
    "أهلا بك.. اطرح أي سؤال يدور في بالك";
});

function sendToChatGPT() {
  let value = document.getElementById("word-input").value.trim();
  if (!value) return;

  let replyContent = document.getElementById("reply-content");
  replyContent.innerHTML = '<div class="loading-spinner"></div>';

  let body = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: value }],
    temperature: 1,
  };

  let headers = {
    Authorization: "Bearer YOUR_API_KEY_HERE",
  };

  axios
    .post("https://api.openai.com/v1/chat/completions", body, {
      headers: headers,
    })
    .then((response) => {
      let reply = response.data.choices[0].message.content;
      replyContent.textContent = reply;
      addToHistory(value, reply);
    })
    .catch((error) => {
      replyContent.innerHTML =
        '<div class="error-message">حدث خطأ أثناء جلب الرد. يرجى المحاولة مرة أخرى.</div>';
      console.error("Error:", error);
    });
}

function addToHistory(question, answer) {
  let historyContent = document.getElementById("history-content");
  let historyItem = document.createElement("div");
  historyItem.className = "history-item";
  historyItem.innerHTML = `<strong>سؤال:</strong> ${question}<br><strong>جواب:</strong> ${answer}`;
  historyContent.appendChild(historyItem);
}
