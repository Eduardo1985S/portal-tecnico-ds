const fs = require('fs');
const path = require('path');

function findEmojis(dir) {
  if (!fs.existsSync(dir)) return;
  
  if (!fs.statSync(dir).isDirectory()) {
    checkFile(dir);
    return;
  }

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.docusaurus' && file !== 'build') {
        findEmojis(fullPath);
      }
    } else {
      checkFile(fullPath);
    }
  }
}

function checkFile(fullPath) {
  if (fullPath.endsWith('.js') || fullPath.endsWith('.json') || fullPath.endsWith('.md') || fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const emojiRegex = /[\\u{1F300}-\\u{1F6FF}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}\\u{1F900}-\\u{1F9FF}\\u{1FA70}-\\u{1FAFF}\\u{1F1E6}-\\u{1F1FF}]/gu;
    let match;
    while ((match = emojiRegex.exec(content)) !== null) {
      console.log(`Found ${match[0]} in ${fullPath}`);
    }
  }
}

findEmojis('./docs');
findEmojis('./src');
findEmojis('./docusaurus.config.js');
findEmojis('./sidebars.js');
