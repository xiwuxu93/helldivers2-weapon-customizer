/**
 * Web Worker for heavy image processing
 * This script runs in a separate thread and does not have access to the DOM.
 */

self.onmessage = function(e) {
    const { imageData, type, ...filters } = e.data;
    
    // The heavy pixel manipulation logic is here
    const processedData = applyAllEffects(imageData, filters);

    // Send the modified data back to the main thread.
    // The imageData.data.buffer is transferred, not copied, for performance.
    self.postMessage({
        processedImageData: processedData,
        type: type
    }, [processedData.data.buffer]);
};

function applyAllEffects(imageData, filters) {
    const data = imageData.data;
    const { contrast, brightness, sepia, grain, shadows, highlights } = filters;

    // Pre-calculate adjustment factors
    const contrastFactor = (contrast / 100) + 1;
    const brightnessFactor = (brightness / 100);
    const sepiaFactor = sepia / 100;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // 1. Grayscale (Luminance Method)
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        r = g = b = luminance;
        
        // 2. Sepia
        if (sepiaFactor > 0) {
            const sepiaR = r + (25 * sepiaFactor);
            const sepiaG = g + (10 * sepiaFactor);
            const sepiaB = b - (20 * sepiaFactor);
            r = Math.min(255, sepiaR);
            g = Math.min(255, sepiaG);
            b = Math.max(0, sepiaB);
        }

        // 3. Brightness
        r = Math.max(0, Math.min(255, r * brightnessFactor));
        g = Math.max(0, Math.min(255, g * brightnessFactor));
        b = Math.max(0, Math.min(255, b * brightnessFactor));
        
        // 4. Contrast
        const avg = (r + g + b) / 3;
        r = Math.max(0, Math.min(255, avg + (r - avg) * contrastFactor));
        g = Math.max(0, Math.min(255, avg + (g - avg) * contrastFactor));
        b = Math.max(0, Math.min(255, avg + (b - avg) * contrastFactor));

        // 5. Shadows and Highlights
        const currentLuminance = 0.299 * r + 0.587 * g + 0.114 * b;
        if (currentLuminance < 128) { // Shadows
            const factor = 1 + shadows / 100;
            r = Math.max(0, Math.min(255, r * factor));
            g = Math.max(0, Math.min(255, g * factor));
            b = Math.max(0, Math.min(255, b * factor));
        } else { // Highlights
            const factor = 1 + highlights / 100;
            r = Math.max(0, Math.min(255, r * factor));
            g = Math.max(0, Math.min(255, g * factor));
            b = Math.max(0, Math.min(255, b * factor));
        }

        // 6. Film Grain
        if (grain > 0) {
            const noise = (Math.random() - 0.5) * grain;
            r = Math.max(0, Math.min(255, r + noise));
            g = Math.max(0, Math.min(255, g + noise));
            b = Math.max(0, Math.min(255, b + noise));
        }

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
    }
    
    return imageData;
} 