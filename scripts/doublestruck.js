document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('alternatingTextForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let inputText = document.getElementById('textInput').value;

    // Convert input text to its doublestruck equivalent using toUnicodeVariant
    let doublestruckText = toUnicodeVariant(inputText, 'doublestruck');

    // Set the doublestruck text as the value of the output element
    const outputElement = document.getElementById('alternatingTextOutput');
    outputElement.textContent = doublestruckText; // Use textContent to set text
    outputElement.style.height = ""; // Reset the height
    outputElement.style.height = outputElement.scrollHeight + "px"; // Adjust the height to fit content
  });

  // Copy to clipboard functionality
  document.getElementById('copyButton').addEventListener('click', function () {
    const textToCopy = document.getElementById('alternatingTextOutput').textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Success feedback
      this.textContent = 'Copied!';
      setTimeout(() => {
        this.textContent = 'Copy Text';
      }, 5000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  });

  // Event listener to revert the copy button text when the input is changed
  document.getElementById('textInput').addEventListener('input', function () {
    document.getElementById('copyButton').textContent = 'Copy Text';
  });
});
