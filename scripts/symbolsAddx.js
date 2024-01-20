document.addEventListener('DOMContentLoaded', function() {
    const addMultiplicationSignCheckbox = document.getElementById('addMultiplicationSign');
    const symbolButtons = document.querySelectorAll('.symbol-btn');

    symbolButtons.forEach(button => {
        button.addEventListener('click', function() {
            let symbol = this.getAttribute('data-symbol');
            if (addMultiplicationSignCheckbox.checked) {
                symbol = '× ' + symbol;
            }
            // Your existing code to copy the symbol to clipboard
            navigator.clipboard.writeText(symbol).then(() => {
                // Your existing code for showing the copied overlay
            }).catch(err => console.error('Error copying text: ', err));
        });
    });
});
