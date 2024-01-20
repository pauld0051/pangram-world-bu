document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('alternatingTextForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const inputText = document.getElementById('textInput').value;
        let alternatingText = '';
        let alternatePatternText = '';
        let letterCount = 0; // Counter for actual letters to maintain the pattern

        // Convert to alternating case, ignoring non-letter characters
        for (let i = 0; i < inputText.length; i++) {
            if (inputText[i].match(/[a-zA-Z]/)) { // Check if it's a letter
                if (letterCount % 2 === 0) {
                    alternatingText += inputText[i].toLowerCase();
                    alternatePatternText += inputText[i].toUpperCase();
                } else {
                    alternatingText += inputText[i].toUpperCase();
                    alternatePatternText += inputText[i].toLowerCase();
                }
                letterCount++; // Only increment for letters
            } else {
                // Directly append non-letter characters without altering the case
                alternatingText += inputText[i];
                alternatePatternText += inputText[i];
            }
        }

        // Update the value and the height of the first text area
        const textArea1 = document.getElementById('alternatingTextOutput');
        textArea1.value = alternatingText;
        textArea1.style.height = 'auto';
        textArea1.style.height = textArea1.scrollHeight + 'px';

        // Update the value and the height of the second text area
        const textArea2 = document.getElementById('alternatingTextOutput1');
        textArea2.value = alternatePatternText;
        textArea2.style.height = 'auto';
        textArea2.style.height = textArea2.scrollHeight + 'px';
    });

    // Function to copy text and provide feedback
    function copyToClipboardAndFeedback(textAreaId, buttonId) {
        const textArea = document.getElementById(textAreaId);
        const button = document.getElementById(buttonId);
        navigator.clipboard.writeText(textArea.value)
            .then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.classList.add('copied');
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000); // Show 'Copied!' for 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy text:', err);
            });
    }

    // Event listeners for the copy buttons
    document.getElementById('copyButton').addEventListener('click', function () {
        copyToClipboardAndFeedback('alternatingTextOutput', 'copyButton');
    });

    document.getElementById('copyButton1').addEventListener('click', function () {
        copyToClipboardAndFeedback('alternatingTextOutput1', 'copyButton1');
    });
});
