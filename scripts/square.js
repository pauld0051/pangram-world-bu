document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('textInput');
  const outputElement = document.getElementById('alternatingTextOutput');
  const outputElement1 = document.getElementById('alternatingTextOutput1'); // New text area for squared negative
  const copyButton = document.getElementById('copyButton');
  const copyButton1 = document.getElementById('copyButton1'); // New copy button for squared negative

  document.getElementById('alternatingTextForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Use the Square variant for transformation
    outputElement.textContent = toUnicodeVariant(input.value, 'squared');
    // Use the Squared Negative variant for transformation
    outputElement1.textContent = toUnicodeVariant(input.value, 'squared negative'); // Alias 'qn' if it's the correct one
    // Adjust the heights to fit content
    outputElement.style.height = outputElement.scrollHeight + 'px';
    outputElement1.style.height = outputElement1.scrollHeight + 'px';
  });

  copyButton.addEventListener('click', function () {
    navigator.clipboard.writeText(outputElement.textContent).then(() => {
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy Text';
      }, 5000);
    }).catch(err => {
      console.error('Error copying text: ', err);
    });
  });

  // New event listener for copying squared negative text
  copyButton1.addEventListener('click', function () {
    navigator.clipboard.writeText(outputElement1.textContent).then(() => {
      copyButton1.textContent = 'Copied!';
      setTimeout(() => {
        copyButton1.textContent = 'Copy Negative Square Text';
      }, 5000);
    }).catch(err => {
      console.error('Error copying text: ', err);
    });
  });

  input.addEventListener('input', function () {
    // Clear outputs when input changes
    outputElement.textContent = '';
    outputElement1.textContent = '';
    // Reset button texts
    copyButton.textContent = 'Copy Square Text';
    copyButton1.textContent = 'Copy Negative Square Text';
  });
});
