/**
 * Web Worker for BATCH image processing.
 * It receives image data and a full preset object to apply effects.
 */

self.onmessage = function(e) {
    const { imageData, preset, fileIdentifier } = e.data;

    // Apply basic filters via pixel manipulation for consistency
    const filteredData = applyBasicFilters(imageData, preset);
    
    // Apply advanced effects
    const processedData = applyAdvancedEffects(filteredData, preset.grain, preset.shadows, preset.highlights);

    // Send the modified data back to the main thread.
    self.postMessage({
        processedImageData: processedData,
        fileIdentifier: fileIdentifier
    }, [processedData.data.buffer]);
};

function applyBasicFilters(imageData, preset) {
    const data = imageData.data;
    const contrast = preset.contrast / 100;
    const brightness = preset.brightness / 100;
    const sepia = preset.sepia / 100;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        
        // Grayscale (Luminosity method)
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        r = g = b = gray;

        // Sepia
        if (sepia > 0) {
            r = Math.min(255, gray * (1 - 0.4 * sepia) + (255 * 0.4 * sepia));
            g = Math.min(255, gray * (1 - 0.2 * sepia));
            b = Math.min(255, gray * (1 - 0.8 * sepia));
        }

        // Contrast
        r = Math.max(0, Math.min(255, ((r - 128) * contrast) + 128));
        g = Math.max(0, Math.min(255, ((g - 128) * contrast) + 128));
        b = Math.max(0, Math.min(255, ((b - 128) * contrast) + 128));
        
        // Brightness
        r = Math.max(0, Math.min(255, r * brightness));
        g = Math.max(0, Math.min(255, g * brightness));
        b = Math.max(0, Math.min(255, b * brightness));

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
    }
    return imageData;
}


function applyAdvancedEffects(imageData, grain, shadows, highlights) {
    const data = imageData.data;
    if (grain === 0 && shadows === 0 && highlights === 0) return imageData;

    for (let i = 0; i < data.length; i += 4) {
        // Luminance is already baked in from grayscale
        const luminance = data[i]; 

        let r = data[i], g = data[i+1], b = data[i+2];

        // Apply shadows and highlights
        if (luminance < 128) { // Shadows
            const factor = 1 + shadows / 100;
            r *= factor;
            g *= factor;
            b *= factor;
        } else { // Highlights
            const factor = 1 + highlights / 100;
            r *= factor;
            g *= factor;
            b *= factor;
        }

        // Apply grain
        if (grain > 0) {
            const noise = (Math.random() - 0.5) * grain;
            r += noise;
            g += noise;
            b += noise;
        }

        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
    }
    
    return imageData;
} 