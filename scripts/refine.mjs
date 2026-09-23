import fs from 'node:fs';
const path='tests/browser.mjs';
let test=fs.readFileSync(path,'utf8');
// Changing only the hash does not reload a document. Force a fresh navigation
// so this test exercises startup recovery for a malformed shared link.
test=test.replace("await page.goto(base+'#not-valid-json');", "await page.goto(base+'?invalid-share-test=1#not-valid-json');");
fs.writeFileSync(path,test);
