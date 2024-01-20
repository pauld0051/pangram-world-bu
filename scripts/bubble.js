document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('textInput');
  const outputBubbleElement = document.getElementById('alternatingTextOutput'); // Text area for bubble text
  const outputNegativeBubbleElement = document.getElementById('alternatingTextOutput1'); // Text area for negative bubble text
  const copyBubbleButton = document.getElementById('copyButton'); // Copy button for bubble text
  const copyNegativeBubbleButton = document.getElementById('copyButton1'); // Copy button for negative bubble text

  document.getElementById('alternatingTextForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Use 'circled' for bubble text transformation
    outputBubbleElement.textContent = toUnicodeVariant(input.value, 'circled');
    // Use 'circled negative' for negative bubble text transformation
    outputNegativeBubbleElement.textContent = toUnicodeVariant(input.value, 'circled negative');
    // Adjust the heights to fit content
    outputBubbleElement.style.height = outputBubbleElement.scrollHeight + 'px';
    outputNegativeBubbleElement.style.height = outputNegativeBubbleElement.scrollHeight + 'px';
  });

  copyBubbleButton.addEventListener('click', function () {
    navigator.clipboard.writeText(outputBubbleElement.textContent).then(() => {
      copyBubbleButton.textContent = 'Copied!';
      setTimeout(() => {
        copyBubbleButton.textContent = 'Copy Bubble Text';
      }, 5000);
    }).catch(err => {
      console.error('Error copying text: ', err);
    });
  });

  copyNegativeBubbleButton.addEventListener('click', function () {
    navigator.clipboard.writeText(outputNegativeBubbleElement.textContent).then(() => {
      copyNegativeBubbleButton.textContent = 'Copied!';
      setTimeout(() => {
        copyNegativeBubbleButton.textContent = 'Copy Negative Bubble Text';
      }, 5000);
    }).catch(err => {
      console.error('Error copying text: ', err);
    });
  });

  input.addEventListener('input', function () {
    // Clear outputs when input changes
    outputBubbleElement.textContent = '';
    outputNegativeBubbleElement.textContent = '';
    // Reset button texts
    copyBubbleButton.textContent = 'Copy Bubble Text';
    copyNegativeBubbleButton.textContent = 'Copy Negative Bubble Text';
  });
});
