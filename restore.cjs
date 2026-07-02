const fs = require('fs');
const content = fs.readFileSync('C:\\\\Users\\\\MH02 12\\\\.gemini\\\\antigravity-ide\\\\brain\\\\feec3303-c4fe-4f0f-899f-febb98465de2\\\\.system_generated\\\\logs\\\\transcript_full.jsonl', 'utf8');

const regex = /"tool_calls":\s*(\[.*?\])/gs;
let match;
const files = {};
while ((match = regex.exec(content)) !== null) {
  try {
    const calls = JSON.parse(match[1]);
    for (const call of calls) {
      if (call.name === 'write_to_file') {
        files[call.args.TargetFile] = call.args.CodeContent;
      }
      if (call.name === 'replace_file_content') {
        const file = call.args.TargetFile;
        if (!files[file]) {
            try { files[file] = fs.readFileSync(file, 'utf8'); } catch(e) { files[file] = ''; }
        }
        if (files[file].includes(call.args.TargetContent)) {
          files[file] = files[file].replace(call.args.TargetContent, call.args.ReplacementContent);
        }
      }
    }
  } catch(e) { }
}

const targets = ['index.css', 'App.css', 'Home.jsx', 'Home.css', 'Product.css'];
for (const [path, data] of Object.entries(files)) {
  if (targets.some(t => path.endsWith(t))) {
    // Write only if it has content
    if (data && data.length > 50) {
      fs.writeFileSync(path, data);
      console.log('Restored: ' + path);
    }
  }
}
