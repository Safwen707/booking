const puppeteer=require('puppeteer')
require('dotenv').config();
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

async function getPrice(url){
const browser=await puppeteer.launch({
    headless:false,
    slowMo:50//tet7al fenetre 9odemk     
})  
console.log('Browser launched.');

const page=await browser.newPage()
console.log('New page created.');


await page.goto(url,{ waitUntil: 'networkidle2' })

console.log('Navigated to target URL.');
    

await page.waitForSelector("#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg") 
await page.click("#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg")    
//------------------------------destination---------------------------------


await page.waitForSelector('input[name="ss"]');
 await page.type('input[name="ss"]', 'Sousse');
//await page.$eval('input[name="ss"]',(el)=>{el.value="sousse"})

console.log("sousse")

await page.waitForSelector('#autocomplete-result-0')
await page.click('#autocomplete-result-0')
console.log("sousse selected")
  
  await page.waitForSelector('button.ead010d0b7.caf094216b.e37cfa350e')
await page.click('button.ead010d0b7.caf094216b.e37cfa350e')
  
//------------------------------search---------------------------------
await page.waitForSelector('button[type="submit"]',{timeout:5000})
await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);
