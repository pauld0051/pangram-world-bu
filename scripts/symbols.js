// Function to show the "copied" overlay
function showCopiedOverlay(overlayElement) {
    overlayElement.style.display = 'block'; // Show the overlay
    setTimeout(() => {
        overlayElement.style.display = 'none'; // Hide the overlay after 5 seconds
    }, 5000);
}

// Function to copy image to clipboard
async function copyImageToClipboard(imgElement, overlayElement) {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = imgElement.naturalWidth;
        canvas.height = imgElement.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgElement, 0, 0);
        canvas.toBlob(async (blob) => {
            const item = new ClipboardItem({ [blob.type]: blob });
            await navigator.clipboard.write([item]);
            showCopiedOverlay(overlayElement); // Show the overlay
        }, 'image/png');
    } catch (err) {
        console.error('Error copying image: ', err);
    }
}

// Event listener for document load
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.symbol-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const copiedOverlay = button.nextElementSibling; // Assuming it's the next sibling
            // Check if this button is for copying text (has data-symbol)
            if (button.dataset.symbol) {
                navigator.clipboard.writeText(button.dataset.symbol).then(() => {
                    showCopiedOverlay(copiedOverlay); // Show the overlay
                }).catch(err => {
                    console.error('Error copying text: ', err);
                });
            } else {
                // If it doesn't have data-symbol, assume it's for copying an image
                const imgElement = button.querySelector('img');
                if (imgElement) {
                    copyImageToClipboard(imgElement, copiedOverlay);
                }
            }
        });
    });
});
