const fs = require('fs');
const path = require('path');
const emojiRegex = /[\\p{Emoji_Presentation}\\p{Extended_Pictographic}]/gu;

function findEmojis(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findEmojis(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.json') || fullPath.endsWith('.md') || fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      let match;
      while ((match = emojiRegex.exec(content)) !== null) {
        console.log(`Found ${match[0]} in ${fullPath}`);
      }
    }
  }
}
findEmojis('./docs');
findEmojis('./src');
