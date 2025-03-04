function sendGptQuery() {
    const userInput = document.getElementById('gptInput').value;
    const apiUrl = `https://delirius-apiofc.vercel.app/ia/gptweb?text=${encodeURIComponent(userInput)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.response) {
                document.getElementById('gptResponse').innerText = data.response;
            } else {
                document.getElementById('gptResponse').innerText = 'Failed to get a response. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('gptResponse').innerText = 'Failed to get a response. Please try again.';
        });
}

document.addEventListener('DOMContentLoaded', (event) => {
    // GPT Chat
    document.getElementById('btnSendGpt').addEventListener('click', sendGptQuery);

    // Dark Mode Toggle
    const toggleBtn = document.getElementById('darkModeToggle');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleBtn.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i> Light Mode' 
            : '<i class="fas fa-moon"></i> Dark Mode';
    });
});
