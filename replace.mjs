import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace hex colors
    content = content.replace(/#008938/g, '#1d4ed8'); // blue-700
    content = content.replace(/#10A94A/g, '#2563eb'); // blue-600
    content = content.replace(/#0b7430/g, '#1e40af'); // blue-800
    content = content.replace(/#42bf6e/g, '#3b82f6'); // blue-500
    
    // Replace tailwind green colors with blue
    content = content.replace(/green-500/g, 'blue-500');
    content = content.replace(/green-600/g, 'blue-600');
    content = content.replace(/green-700/g, 'blue-700');
    content = content.replace(/green-800/g, 'blue-800');
    content = content.replace(/green-100/g, 'blue-100');
    content = content.replace(/green-200/g, 'blue-200');
    content = content.replace(/green-50/g, 'blue-50');
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log("Colors replaced successfully!");
