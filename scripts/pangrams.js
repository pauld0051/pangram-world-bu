document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('pangramForm');
    const phraseInput = document.getElementById('phraseInput');
    const resultDiv = document.getElementById('result');
    const checkButton = form.querySelector('button');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const phrase = phraseInput.value.toLowerCase();
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let missingLetters = [];

        for (let letter of alphabet) {
            if (!phrase.includes(letter)) {
                missingLetters.push(letter);
            }
        }

        if (missingLetters.length === 0) {
            resultDiv.textContent = 'Your phrase is a pangram! It contains every letter of the alphabet.';
        } else {
            resultDiv.textContent = 'Your phrase is missing the following letters: ' + missingLetters.join(', ') + '.';
        }

        // Change button text to "Checked"
        checkButton.textContent = 'Checked';
    });

    // Event listener to change the button text back to "Check" when the input changes
    phraseInput.addEventListener('input', function () {
        checkButton.textContent = 'Check';
    });
});
