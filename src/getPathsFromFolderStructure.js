const fs = require("fs");
const path = require("path");

function generatePaths(directoryPath, parentPath = "") {
  const paths = [];
  const items = fs.readdirSync(directoryPath);

  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      const currentPath = parentPath ? `${parentPath}/${item}` : item;
      paths.push(...generatePaths(itemPath, currentPath));
    } else if (stats.isFile() && item === "page.tsx") {
      const currentPath = parentPath
        ? parentPath
        : path.basename(directoryPath);
      paths.push(currentPath);
    }
  }

  return paths;
}

module.exports = generatePaths;
