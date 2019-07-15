const hexGenerator = (color) => {
    var result = {};
    var color_string = color.substring(4, color.length - 1);

    result.color_array = color_string.split(",").map(data => parseInt(data))
    result.HEX = result.color_array.map(data => {
        var hex_str = data.toString(16);
        if (hex_str.length === 1) {
            return "0" + hex_str;
        } else {
            return hex_str;
        }
    }).join("").toUpperCase();

    return result;
}

const hsvGenerator = (color_array) => {
    var R = color_array[0] / 255;
    var G = color_array[1] / 255;
    var B = color_array[2] / 255;

    var minRGB = Math.min(R, G, B);
    var maxRGB = Math.max(R, G, B);

    if (minRGB === maxRGB) {
        return `hsv(0, 0, ${maxRGB.toFixed(2)})`;
    } else {
        var D = (R === minRGB) ? G - B : ((B === minRGB) ? R - G : B - R);
        var H = (R === minRGB) ? 3 : ((B === minRGB) ? 1 : 5);
        return `hsv(${(60 * (H - D / (maxRGB - minRGB))).toFixed(2)}, ${((maxRGB - minRGB) / maxRGB).toFixed(2)}, ${maxRGB.toFixed(2)})`;
    }
}

const hslGenerator = (color_array) => {
    var H = 0;
    var S = 0;
    var L = 0;

    var R = color_array[0] / 255;
    var G = color_array[1] / 255;
    var B = color_array[2] / 255;

    var minRGB = Math.min(R, G, B);
    var maxRGB = Math.max(R, G, B);
    var delta = maxRGB - minRGB;

    if (delta === 0) {
        H = 0;
    } else if (maxRGB === R) {
        H = ((G - B) / delta) % 6;
    } else if (maxRGB === G) {
        H = (B - R) / delta + 2;
    } else {
        H = (R - G) / delta + 4
    }

    H = Math.round((H * 60) * 100) / 100;
    if (H < 0) {
        H += 360;
    }

    L = (maxRGB + minRGB) / 2;
    S = delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));

    S = +(S * 100).toFixed(2);
    L = +(L * 100).toFixed(2);

    return `hsl(${H}, ${S}%, ${L}%)`;
}

export {
    hexGenerator,
    hslGenerator,
    hsvGenerator
}