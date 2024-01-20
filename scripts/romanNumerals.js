document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('alternatingTextForm');
    const numberInput = document.getElementById('textInput');
    const romanOutput = document.getElementById('alternatingTextOutput');
    const copyButton = document.getElementById('copyButton');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const number = parseInt(numberInput.value);
        romanOutput.value = convertToRoman(number);
    });

    copyButton.addEventListener('click', function () {
        navigator.clipboard.writeText(romanOutput.value).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => copyButton.textContent = 'Copy Roman Numerals', 5000);
        }).catch(err => console.error('Error copying text: ', err));
    });

    function convertToRoman(num) {
        if (num < 1 || num > 3999) return "Invalid Number"; // Roman numerals range
        const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
        let roman = '';
        for (let i in lookup ) {
            while ( num >= lookup[i] ) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // ... [existing code for converting to Roman numerals] ...

    const romanToArabicForm = document.getElementById('romanToArabicForm');
    const romanInput = document.getElementById('romanInput');
    const arabicOutput = document.getElementById('arabicNumberOutput');
    const copyArabicButton = document.getElementById('copyArabicButton');

    romanToArabicForm.addEventListener('submit', function (e) {
        e.preventDefault();
        arabicOutput.value = convertToArabic(romanInput.value.toUpperCase());
    });

    copyArabicButton.addEventListener('click', function () {
        navigator.clipboard.writeText(arabicOutput.value).then(() => {
            copyArabicButton.textContent = 'Copied!';
            setTimeout(() => copyArabicButton.textContent = 'Copy Number', 5000);
        }).catch(err => console.error('Error copying text: ', err));
    });

    function convertToArabic(roman) {
        const romanNumerals = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
        let index = 0, num = 0;
        for (let i in romanNumerals) {
            while (roman.indexOf(i, index) === index) {
                num += romanNumerals[i];
                index += i.length;
            }
        }
        return num;
    }
});

