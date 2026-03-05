const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
let count = 0;

for (let file of files) {
    const fp = path.join(dir, file);
    let txt = fs.readFileSync(fp, 'utf8');

    // Remove redundant inline shadows and backgrounds from elements with 'card' class
    // This allows the index.css styles to take full control.
    let newTxt = txt.replace(/className=\"card[^\"]*\"\s+style=\{\{\s*[^}]*\}\}/g, (match) => {
        // Only strip if it contains background or shadow
        if (match.includes('background') || match.includes('boxShadow') || match.includes('border:')) {
            // Keep style but move non-visual properties? No, let's just surgically remove the problematic keys.
            return match
                .replace(/background:\s*['"][^'"]*['"]\/\*bg\*\/\s*,?/g, '')
                .replace(/background:\s*['"][^'"]*['"],?/g, '')
                .replace(/boxShadow:\s*['"][^'"]*['"],?/g, '')
                .replace(/border:\s*['"][^'"]*['"],?/g, '')
                .replace(/borderRadius:\s*[^,}]*,?/g, '')
                .replace(/padding:\s*[^,}]*,?/g, ''); // Keep padding if it's specific? Actually .card has padding 24px in css.
        }
        return match;
    });

    // Cleanup empty styles
    newTxt = newTxt.replace(/style=\{\{\s*\}\}/g, '');

    // One more pass for specific common inline style blocks found in my previous research
    newTxt = newTxt.replace(/style=\{\{\s*position:\s*'relative',\s*overflow:\s*'hidden',\s*boxShadow:[^}]+\}\}/g, 'className="card"');

    if (newTxt !== txt) {
        fs.writeFileSync(fp, newTxt, 'utf8');
        count++;
        console.log('Cleaned cards in', file);
    }
}
console.log('Finished card cleanup:', count);
