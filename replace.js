const fs = require('fs');
const path = require('path');

const replacements = {
  '🎯': '<i className="fa-solid fa-bullseye" style={{ color: \\'var(--ifm-color-primary)\\' }}></i>',
  '📚': '<i className="fa-solid fa-book" style={{ color: \\'var(--ifm-color-primary)\\' }}></i>',
  '🧠': '<i className="fa-solid fa-brain" style={{ color: \\'var(--ifm-color-primary)\\' }}></i>',
  '💻': '<i className="fa-solid fa-laptop-code" style={{ color: \\'var(--ifm-color-primary)\\' }}></i>',
  '🧪': '<i className="fa-solid fa-flask" style={{ color: \\'var(--ifm-color-primary)\\' }}></i>',
  '✅': '<i className="fa-solid fa-list-check" style={{ color: \\'var(--ifm-color-primary)\\' }}></i>',
  '📝': '<i className="fa-solid fa-clipboard" style={{ color: \\'var(--ifm-color-primary)\\' }}></i>',
  '👉': '<i className="fa-solid fa-hand-point-right" style={{ color: \\'var(--ifm-color-primary)\\' }}></i>',
  '⚠️': '<i className="fa-solid fa-triangle-exclamation" style={{ color: \\'#e3a008\\' }}></i>',
  '💡': '<i className="fa-solid fa-lightbulb" style={{ color: \\'#e3a008\\' }}></i>'
};

function replaceEmojisInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceEmojisInDir(fullPath);
    } else if (fullPath.endsWith('.md') || fullPath.endsWith('.mdx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [emoji, icon] of Object.entries(replacements)) {
        if (content.includes(emoji)) {
          content = content.split(emoji).join(icon);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated: ' + fullPath);
      }
    }
  }
}

replaceEmojisInDir('./docs');
