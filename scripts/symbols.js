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

// Function to update image sizes and label text
function updateImageSizes() {
    const sizeRange = document.getElementById('sizeRange');
    const sizeLabel = document.getElementById('sizeLabel'); // Label element for displaying size
    const buttons = document.querySelectorAll('.symbol-btn');
    const size = sizeRange.value;

    // Update label text
    let labelText;
    switch(size) {
        case '1': labelText = '10'; break;
        case '2': labelText = '12'; break;
        case '3': labelText = '18'; break;
        case '4': labelText = '20'; break;
        default: labelText = 'Size';
    }
    sizeLabel.textContent = `Font Size: ${labelText}`;

    // Update image sources
    buttons.forEach(button => {
        const baseImageSrc = button.getAttribute('data-baseimgsrc');
        let imgSrc;

        switch(size) {
            case '1': imgSrc = baseImageSrc + ".png"; break;
            case '2': imgSrc = baseImageSrc + "L.png"; break;
            case '3': imgSrc = baseImageSrc + "VL.png"; break;
            case '4': imgSrc = baseImageSrc + "H.png"; break;
        }

        const imgElement = button.querySelector('img');
        if (imgElement) {
            imgElement.src = imgSrc;
        }
    });
}

// Event listener for document load
document.addEventListener('DOMContentLoaded', () => {
    // Event listener for image and text copy buttons
    const buttons = document.querySelectorAll('.symbol-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const copiedOverlay = button.nextElementSibling;
            if (button.dataset.symbol) {
                // Copying text
                navigator.clipboard.writeText(button.dataset.symbol).then(() => {
                    showCopiedOverlay(copiedOverlay);
                }).catch(err => {
                    console.error('Error copying text: ', err);
                });
            } else {
                // Copying an image
                const imgElement = button.querySelector('img');
                if (imgElement) {
                    copyImageToClipboard(imgElement, copiedOverlay);
                }
            }
        });
    });
});

async function copyImageToClipboard(dataUrl) {
    try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
        // Optionally, show a "copied" message or overlay
    } catch (err) {
        console.error('Error copying image: ', err);
    }
}