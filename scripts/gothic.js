document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('textInput');
  const outputElement = document.getElementById('alternatingTextOutput');
  const outputBoldElement = document.getElementById('alternatingTextOutput1');
  const copyButton = document.getElementById('copyButton');
  const copyBoldButton = document.getElementById('copyBoldButton');

  document.getElementById('alternatingTextForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Use the Gothic variant for transformation
    outputElement.textContent = toUnicodeVariant(input.value, 'gothic');
    // Use the Gothic Bold variant for transformation
    outputBoldElement.textContent = toUnicodeVariant(input.value, 'gothic bold');
    outputElement.style.height = outputElement.scrollHeight + 'px'; // Adjust the height to fit content
    outputBoldElement.style.height = outputBoldElement.scrollHeight + 'px'; // Adjust the height to fit content
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

  copyBoldButton.addEventListener('click', function () {
    navigator.clipboard.writeText(outputBoldElement.textContent).then(() => {
      copyBoldButton.textContent = 'Copied!';
      setTimeout(() => {
        copyBoldButton.textContent = 'Copy Bold Text';
      }, 5000);
    }).catch(err => {
      console.error('Error copying text: ', err);
    });
  });
input.addEventListener('input', function () {
    // Removed the lines that clear the text areas
    copyButton.textContent = 'Copy Text';
    copyBoldButton.textContent = 'Copy Bold Text';
});

});
