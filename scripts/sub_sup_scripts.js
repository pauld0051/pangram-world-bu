document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('textInput');
  const outputSuperscript = document.getElementById('alternatingTextOutput');
  const outputSubscript = document.getElementById('alternatingTextOutput1');
  const copyButton = document.getElementById('copyButton');
  const copySubscriptButton = document.getElementById('copyBoldButton');

  const superscriptOffset = 8256; // Offset for ASCII superscript
  const subscriptOffset = 8272; // Offset for ASCII subscript

  function convertToASCIISuperSub(text, isSuper) {
  const superscriptMap = {
  // Numbers
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  // Lowercase Latin letters
  'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᶢ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 
  'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 
  'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
  // Capital Latin letters
  'H': 'ᵸ', 'I': 'ᶦ', 'L': 'ᶫ', 'N': 'ᶰ', 'S': 'ˢ', 'U': 'ᶸ', 'V': 'ᵛ', 'X': 'ˣ', 'Z': 'ᶻ',
  // Symbols
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾'
};

  const subscriptMap = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 
  'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ',
  // Symbols
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎'
};


  return [...text].map(char => {
    if (isSuper && superscriptMap[char]) {
      return superscriptMap[char];
    } else if (!isSuper && subscriptMap[char]) {
      return subscriptMap[char];
    } else {
      return char; // Other characters remain unchanged
    }
  }).join('');
}


  document.getElementById('alternatingTextForm').addEventListener('submit', function (e) {
    e.preventDefault();
    outputSuperscript.textContent = convertToASCIISuperSub(input.value, true);
    outputSubscript.textContent = convertToASCIISuperSub(input.value, false);
  });

  copyButton.addEventListener('click', function () {
    navigator.clipboard.writeText(outputSuperscript.textContent).then(() => {
      copyButton.textContent = 'Copied!';
      setTimeout(() => copyButton.textContent = 'Copy Text', 5000);
    }).catch(err => console.error('Error copying text: ', err));
  });

  copySubscriptButton.addEventListener('click', function () {
    navigator.clipboard.writeText(outputSubscript.textContent).then(() => {
      copySubscriptButton.textContent = 'Copied!';
      setTimeout(() => copySubscriptButton.textContent = 'Copy Subscript Text', 5000);
    }).catch(err => console.error('Error copying text: ', err));
  });

  input.addEventListener('input', function () {
    copyButton.textContent = 'Copy Text';
    copySubscriptButton.textContent = 'Copy Subscript Text';
  });
});
