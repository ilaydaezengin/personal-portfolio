// Function to handle sending the message
function sendMessage() {
    const userMessage = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    if (userMessage.trim() !== "") {
        // Append the user's message to the chat box
        chatBox.innerHTML += `<div class="user-message"><strong>You:</strong> ${userMessage}</div>`;
        document.getElementById("user-input").value = ""; // Clear the input field

        // Send the user's message to the backend
        fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage }),
        })
        .then(response => response.json())
        .then(data => {
            // Append the AI's response to the chat box
            const aiMessage = data.reply;
            chatBox.innerHTML += `<div class="ai-message"><strong>AI:</strong> ${aiMessage}</div>`;

            // Ensure the chat box is scrolled to the bottom after a new message is added
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

// Add event listener for "Enter" key to send the message
document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
