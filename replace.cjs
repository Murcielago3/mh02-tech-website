const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('c:/Users/MH02 12/Desktop/mh02TechWebsite/src');

files.forEach(file => {
  if (file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.js')) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace em dashes
    content = content.replace(/—/g, '-');
    
    // Rebrand Product Name
    content = content.replace(/MH02 OS/g, 'MH02 Dashboard');
    content = content.replace(/mh02-os/g, 'mh02-dashboard');
    
    // Replace Email
    content = content.replace(/hello@studiomh02\.tech/g, 'xyz@studiomh02.com');
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
    }
  }
});
