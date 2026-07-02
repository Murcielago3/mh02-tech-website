const fs = require('fs');
const content = fs.readFileSync('C:\\\\Users\\\\MH02 12\\\\.gemini\\\\antigravity-ide\\\\brain\\\\feec3303-c4fe-4f0f-899f-febb98465de2\\\\.system_generated\\\\logs\\\\transcript_full.jsonl', 'utf8');

const regex = /"tool_calls":\s*(\[.*?\])/gs;
let match;
while ((match = regex.exec(content)) !== null) {
  try {
    const calls = JSON.parse(match[1]);
    for (const call of calls) {
      if (call.name === 'replace_file_content' || call.name === 'write_to_file') {
        const file = call.args.TargetFile;
        if (file && (file.endsWith('index.css') || file.endsWith('App.css'))) {
           console.log(call.name, file);
        }
      }
    }
  } catch(e) { }
}
