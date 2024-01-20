// Default background is transparent
let background = 'transparent';
let size = 'normal';

document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners here
    const renderButton = document.getElementById('renderButton');
    const backgroundSelect = document.getElementById('backgroundSelect');
    const sizeSelect = document.getElementById('sizeSelect');

    renderButton.addEventListener('click', renderEquation);

    // Don't call `setBackground` and `setSize` here
    // Just set the default values
    backgroundSelect.value = 'transparent';
    sizeSelect.value = 'normal';
});

function renderEquation() {
    // Update the size and background based on current selections
    background = document.getElementById('backgroundSelect').value;
    size = document.getElementById('sizeSelect').value;

    // Clear previous results
    clearPreviousResults();

    const latexCode = document.getElementById('latexInput').value;
    const mathContainer = document.getElementById('mathContainer');
    mathContainer.innerHTML = `\\(${latexCode}\\)`;
    mathContainer.style.textAlign = 'center'; // Center the content

    // Adjust size based on the size selection
    adjustSizeForMathJax();

    MathJax.typesetPromise().then(() => {
        mathContainer.style.visibility = 'hidden'; // Hide container to prevent flickering
        convertToImage(); // Convert the MathJax output to an image
    }).catch(err => console.error('Error in typesetting:', err));
}

function adjustSizeForMathJax() {
    // Example implementation - adjust as needed
    // This should be adjusted to whatever method works with your version of MathJax
    const mathContainer = document.getElementById('mathContainer');
    switch(size) {
        case 'small': mathContainer.style.fontSize = '0.7em'; break;
        case 'normal': mathContainer.style.fontSize = '1em'; break;
        case 'large': mathContainer.style.fontSize = '1.4em'; break;
        case 'veryLarge': mathContainer.style.fontSize = '2.0em'; break;
        case 'huge': mathContainer.style.fontSize = '2.8em'; break;
    }
}

function clearPreviousResults() {
    // Clear the result image and download link
    const resultImage = document.getElementById('resultImage');
    const downloadLink = document.getElementById('downloadLink');
    const latexCopyContainer = document.getElementById('latexCopyContainer');

    if (resultImage) {
        resultImage.style.display = 'none';
        resultImage.src = ''; // Clear the source of the image
    }
    if (downloadLink) {
        downloadLink.style.display = 'none';
        downloadLink.href = '#'; // Reset the href attribute
        downloadLink.textContent = ''; // Clear the text content
    }
    if (latexCopyContainer) {
        latexCopyContainer.innerHTML = '';
    }
}

function convertToImage() {
    const mathContainer = document.getElementById('mathContainer');
    // Temporarily position the mathContainer off-screen
    mathContainer.style.position = 'absolute';
    mathContainer.style.left = '-9999px';
    mathContainer.style.visibility = 'visible';

    // Render the image with html2canvas
    html2canvas(mathContainer, {
        backgroundColor: background === 'transparent' ? 'rgba(0,0,0,0)' : 'white',
    }).then(canvas => {
        // Now that the image is rendered, reset the mathContainer's style
        mathContainer.style.position = '';
        mathContainer.style.left = '';
        mathContainer.style.visibility = 'hidden';

        // Set the source of the result image and display it
        const resultImage = document.getElementById('resultImage');
        resultImage.src = canvas.toDataURL('image/png');
        resultImage.style.display = 'block'; // Show the image
        resultImage.style.margin = 'auto'; // Center the image if needed

        // Create the download link
        createDownloadLink(canvas.toDataURL('image/png'));

        // Create and display the copy button
        createCopyButton(canvas.toDataURL('image/png'));
    });
}

function createDownloadLink(imageUrl) {
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = imageUrl;
    downloadLink.download = 'equation.png';
    downloadLink.style.display = 'block'; // Show the download link
    downloadLink.textContent = 'Download Image'; // Text for the download link
    downloadLink.style.textAlign = 'center'; // Center the download link
}

function createCopyButton(imageUrl) {
    const latexCopyContainer = document.getElementById('latexCopyContainer');
    latexCopyContainer.innerHTML = ''; // Clear any existing content

    const copyButton = document.createElement('button');
    copyButton.className = 'symbol-btn';
    copyButton.innerText = 'Copy PNG';
    copyButton.onclick = () => copyImageToClipboard(imageUrl);

    latexCopyContainer.appendChild(copyButton);
}

function setBackground(selectedBackground) {
    background = selectedBackground;
    // No need to update dropdown text as it's now a select element
    // Render the equation again with the new background
    renderEquation();
}

function setSize(selectedSize) {
    size = selectedSize;
    renderEquation();
}

// Fallback method for copying images to clipboard
function copyImageFallback(dataUrl) {
    // Create an off-screen image element
    const img = document.createElement('img');
    img.src = dataUrl;
    document.body.appendChild(img);

    // Create a range and selection to select the image
    const range = document.createRange();
    range.selectNode(img);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        // Attempt to execute the copy command
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying image command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    // Clean up
    selection.removeAllRanges();
    document.body.removeChild(img);
}

// Function to copy image to clipboard
async function copyImageToClipboard(dataUrl) {
    if (!window.ClipboardItem) {
        // Use fallback for browsers without ClipboardItem support
        copyImageFallback(dataUrl);
        return;
    }

    // ClipboardItem is supported
    try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
        console.log('Image copied to clipboard.');
    } catch (err) {
        console.error('Error copying image: ', err);
        // If the Clipboard API fails, use the fallback
        copyImageFallback(dataUrl);
    }
}