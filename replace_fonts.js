const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

function processFiles() {
    const dirs = ['components', 'app', 'lib', 'public/artifacts', 'src', 'styles'];
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '.css'];

    dirs.forEach(d => {
        const fullDir = path.join('/Users/mehdielkadiri/eigen-repos/raqib-v4', d);
        walkDir(fullDir, (filePath) => {
            if (extensions.some(ext => filePath.endsWith(ext))) {
                let content = fs.readFileSync(filePath, 'utf8');
                let originalContent = content;

                // Remove fontStyle properites
                content = content.replace(/fontStyle:\s*['"]italic['"],?/g, '');
                content = content.replace(/font-style:\s*italic;?/g, '');
                content = content.replace(/\.attr\('font-style',\s*'italic'\)/g, ''); // For D3
                
                // Remove word italic from classNames
                // We'll replace ' italic ' with ' ', then the start/end cases
                content = content.replace(/(["'`\s])italic(["'`\s])/g, '$1$2');
                content = content.replace(/(["'`\s])italic(["'`\s])/g, '$1$2'); // double pass for adjacencies

                // Cormorant Garamond -> Playfair Display
                content = content.replace(/Cormorant Garamond/g, 'Playfair Display');
                content = content.replace(/Cormorant_Garamond/g, 'Playfair_Display');
                content = content.replace(/cormorant/g, 'playfair');
                
                // DM Sans -> Geist
                content = content.replace(/DM Sans/g, 'Geist');
                content = content.replace(/DM_Sans/g, 'Geist');

                // Border radius > 0 to 0 (simplified logic: find rx="...", borderRadius="...", rounded-xl etc)
                // Tailwind rounded classes
                content = content.replace(/\brounded-(sm|md|lg|xl|2xl|3xl|full|t-[a-z]+|b-[a-z]+|l-[a-z]+|r-[a-z]+|[trbylx]+-[a-z]+)\b/g, 'rounded-none');
                content = content.replace(/\brounded\b/g, 'rounded-none');
                content = content.replace(/borderRadius:\s*['"]?[0-9]+(px|rem|em|%)?['"]?,?/g, 'borderRadius: 0,');
                content = content.replace(/border-radius:\s*[0-9]+(px|rem|em|%)?;?/g, 'border-radius: 0;');
                content = content.replace(/\brx=\{?[0-9]+\}?/g, 'rx={0}');
                content = content.replace(/\bry=\{?[0-9]+\}?/g, 'ry={0}');

                if (content !== originalContent) {
                    fs.writeFileSync(filePath, content, 'utf8');
                }
            }
        });
    });
}

processFiles();
