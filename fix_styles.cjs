const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
let count = 0;

for (let file of files) {
    const fp = path.join(dir, file);
    let txt = fs.readFileSync(fp, 'utf8');

    let newTxt = txt
        // Fix syntax errors introduced by previous script
        .replace(/' '#FFFFFF'\/\*bg\*\/ '/g, "'#FFFFFF'")
        .replace(/'1px solid 'rgba\(0,0,0,0\.08\)''/g, "'1px solid rgba(0,0,0,0.08)'")
        .replace(/'1px solid 'rgba\(0,0,0,0\.05\)''/g, "'1px solid rgba(0,0,0,0.05)'")
        .replace(/'1px solid 'rgba\(0,0,0,0\.1\)''/g, "'1px solid rgba(0,0,0,0.1)'")
        .replace(/'1px solid 'rgba\(239,68,68,0\.18\)''/g, "'1px solid rgba(239,68,68,0.18)'")
        .replace(/background:\s*''#F8FAFC''/g, "background: '#F8FAFC'")

        // Ensure premium look: White cards with subtle shadows
        .replace(/background:\s*'#FFFFFF'/g, "background: '#FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.06)'")
        .replace(/className="card"/g, "className=\"card shadow-sm\" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px' }}")

        // Fix text colors for readability on white
        .replace(/#F0F4FF/g, '#1E293B')
        .replace(/#FFF/g, '#1E293B')
        .replace(/#FFFFFF/g, '#1E293B');

    // Additional cleanup for redundant styles if any
    newTxt = newTxt.replace(/boxShadow:\s*'0 4px 12px rgba\(0,0,0,0\.05\)',\s*boxShadow:\s*'0 4px 12px rgba\(0,0,0,0\.05\)'/g, "boxShadow: '0 4px 12px rgba(0,0,0,0.05)'");

    if (newTxt !== txt) {
        fs.writeFileSync(fp, newTxt, 'utf8');
        count++;
        console.log('Cleaned up', file);
    }
}
console.log('Finished cleaning files:', count);
