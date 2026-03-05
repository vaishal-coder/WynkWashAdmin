const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
let count = 0;

for (let file of files) {
    const fp = path.join(dir, file);
    let txt = fs.readFileSync(fp, 'utf8');
    let old = txt;

    // Fix occurrences of '1px solid 'rgba(..)' '
    // We match any property name just in case
    txt = txt.replace(/'1px solid 'rgba\(([^)]+)\)''/g, "'1px solid rgba($1)'");
    txt = txt.replace(/borderTop:\s*'1px solid 'rgba\([^)]+\)''/g, "borderTop: '1px solid rgba(0,0,0,0.06)'");

    if (txt !== old) {
        fs.writeFileSync(fp, txt, 'utf8');
        count++;
        console.log('Fixed syntax in', file);
    }
}
console.log('Total fixed:', count);
