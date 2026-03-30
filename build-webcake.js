const fs = require('fs');

let html = fs.readFileSync('./index.html', 'utf8');
const css = fs.readFileSync('./styles.css', 'utf8');
const js = fs.readFileSync('./script.js', 'utf8');

// Inline CSS
html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + css + '\n</style>');

// Inline JS
html = html.replace('<script src="script.js"></script>', '<script>\n' + js + '\n</script>');

// Replace local images with Unsplash
html = html.replace(/src="images\/hero-bg\.png"/g, 'src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"');
html = html.replace(/src="images\/skyline\.png"/g, 'src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"');
html = html.replace(/src="images\/team\.png"/g, 'src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"');

fs.writeFileSync('./index-webcake.html', html, 'utf8');
console.log('Done! Size: ' + (html.length / 1024).toFixed(1) + ' KB');
