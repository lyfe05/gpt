function sendGptQuery() {
    const userInput = document.getElementById('chatInput').value;
    const apiUrl = `https://delirius-apiofc.vercel.app/ia/gptweb?text=${encodeURIComponent(userInput)}`;

    // Display user message
    const chatMessages = document.getElementById('chatMessages');
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-bubble user';
    userMessage.innerText = userInput;
    chatMessages.appendChild(userMessage);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'chat-bubble ai';
            if (data && data.response) {
                aiMessage.innerText = data.response;
            } else {
                aiMessage.innerText = 'Failed to get a response. Please try again.';
            }
            chatMessages.appendChild(aiMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'chat-bubble ai';
            errorMessage.innerText = 'Failed to get a response. Please try again.';
            chatMessages.appendChild(errorMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
        });

    // Clear input field
    document.getElementById('chatInput').value = '';
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('sendBtn').addEventListener('click', sendGptQuery);

    // Send message on Enter key press
    document.getElementById('chatInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendGptQuery();
        }
    });

    // Dark Mode Toggle
    const toggleBtn = document.getElementById('darkModeToggle');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleBtn.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i> Light Mode' 
            : '<i class="fas fa-moon"></i> Dark Mode';
    });
});
