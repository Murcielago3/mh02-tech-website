const fs = require('fs');
const content = fs.readFileSync('C:\\\\Users\\\\MH02 12\\\\.gemini\\\\antigravity-ide\\\\brain\\\\feec3303-c4fe-4f0f-899f-febb98465de2\\\\.system_generated\\\\logs\\\\transcript_full.jsonl', 'utf8');

const lines = content.split('\n');
const files = {};
for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      for (const call of obj.tool_calls) {
        if (call.name === 'write_to_file') {
          files[call.args.TargetFile] = call.args.CodeContent;
        }
        if (call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
          const file = call.args.TargetFile;
          if (!files[file]) {
              try { files[file] = fs.readFileSync(file, 'utf8'); } catch(e) { files[file] = ''; }
          }
          if (call.name === 'replace_file_content') {
            files[file] = files[file].replace(call.args.TargetContent, call.args.ReplacementContent);
          } else {
            for (const chunk of call.args.ReplacementChunks) {
              files[file] = files[file].replace(chunk.TargetContent, chunk.ReplacementContent);
            }
          }
        }
      }
    }
  } catch(e) { }
}

const targetPath = 'c:\\Users\\MH02 12\\Desktop\\mh02TechWebsite\\src\\pages\\Home.jsx';
if (files[targetPath]) {
  fs.writeFileSync('src/pages/Home.jsx', files[targetPath]);
  console.log('Restored latest Home.jsx');
}
