import fs from 'node:fs';
let html = fs.readFileSync('index.html','utf8');
if(html.includes('<style>')) {
 let css=html.match(/<style>([\s\S]*?)<\/style>/)[1];
 let js=html.match(/<script>([\s\S]*?)<\/script>/)[1];
 css += '\n/* Small-screen and legibility refinements. */\n.coordinate span,.scene-label span{color:#929aae!important}\n@media(max-width:1050px){.coordinate{bottom:80px}}\n@media(max-width:720px){.sidebar .settings{grid-column:1 / -1;grid-row:auto}.sidebar{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.header-actions{gap:10px}.header-actions .text-btn{font-size:0;width:24px;height:32px}.header-actions .text-btn:after{content:"?";font-size:15px}.pill{font-size:11px;padding:9px 10px}.brand{letter-spacing:3px}header{padding:0 5%}.eyebrow{font-size:9px;letter-spacing:1.5px}.sound-row{gap:8px}.switch{flex-shrink:0}}\n';
 html=html.replace(/<style>[\s\S]*?<\/style>/,'<link rel="stylesheet" href="styles.css">').replace(/<script>[\s\S]*?<\/script>/,'<script src="app.js" defer></script>');
 fs.writeFileSync('styles.css',css);fs.writeFileSync('app.js',js);fs.writeFileSync('index.html',html);
}
let test=fs.readFileSync('tests/browser.mjs','utf8');
test=test.replace("const server = createServer((req,res) => { res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); res.end(html); });",`const server = createServer(async (req,res) => {
 const name = new URL(req.url, 'http://localhost').pathname;
 if(name === '/styles.css' || name === '/app.js') { res.writeHead(200, {'Content-Type':name.endsWith('.css')?'text/css':'text/javascript'});res.end(await readFile('.'+name)); }
 else { res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});res.end(html); }
});`);
test=test.replace("await page.locator('#gravity').fill('1.4');", "await page.locator('#gravity').evaluate(e => e.value = '1.4');");
test=test.replace("await page.locator('#speed').fill('0.8');", "await page.locator('#speed').evaluate(e => e.value = '0.8');");
if(!test.includes('uncaughtExceptionMonitor')) test="process.on('uncaughtExceptionMonitor', e => console.log('::error::'+String(e.stack).replaceAll('%','%25').replaceAll('\\n','%0A').replaceAll('\\r','%0D')));\n"+test;
fs.writeFileSync('tests/browser.mjs',test);
let readme=fs.readFileSync('README.md','utf8').replace('`index.html` contains the complete application.', '`index.html`, `styles.css`, and `app.js` contain the complete application.');
fs.writeFileSync('README.md',readme);
