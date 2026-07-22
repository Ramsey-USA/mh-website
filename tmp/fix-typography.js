const fs = require("fs");
const { execSync } = require("child_process");

const files = execSync(
  'grep -rl "uppercase" src/ --include="*.tsx" --include="*.ts"',
  { encoding: "utf8", cwd: "/workspaces/mh-website/apps/website" },
)
  .trim()
  .split("\n")
  .filter(Boolean);

const trackingRe = /\btracking-(?:wide|wider|widest)\b/;
const uppercaseRe = /\buppercase\b/;
const fontHeadingRe = /\bfont-heading\b/;
const classNameRe = /className="([^"]*)"/g;

let fixedFiles = 0;
for (const f of files) {
  const absPath = "/workspaces/mh-website/apps/website/" + f;
  let src = fs.readFileSync(absPath, "utf8");
  let changed = false;
  const newSrc = src.replace(classNameRe, (match, classes) => {
    if (
      uppercaseRe.test(classes) &&
      trackingRe.test(classes) &&
      !fontHeadingRe.test(classes)
    ) {
      changed = true;
      return (
        'className="' +
        classes.replace(uppercaseRe, "font-heading uppercase") +
        '"'
      );
    }
    return match;
  });
  if (changed) {
    fs.writeFileSync(absPath, newSrc);
    fixedFiles++;
    console.log("Fixed:", f);
  }
}
console.log("Total files fixed:", fixedFiles);
