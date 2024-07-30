
const puppeteer=require('puppeteer')
require('dotenv').config();
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

async function getPrice(url){
const browser=await puppeteer.launch({
    headless:false,//tet7al fenetre 9odemk     
})  
console.log('Browser launched.');

const page=await browser.newPage()
console.log('New page created.');


await page.goto(url)

console.log('Navigated to target URL.');
    


await page.waitForSelector("#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg") 
await page.click("#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg")    
//------------------------------destination---------------------------------

await page.waitForSelector('input[name="ss"]');
await page.type('input[name="ss"]', 'Sousse');

await page.waitForSelector('#autocomplete-result-0')
await page.click('#autocomplete-result-0')
  
  await page.waitForSelector('button.ead010d0b7.caf094216b.e37cfa350e')
await page.click('button.ead010d0b7.caf094216b.e37cfa350e')
  
await page.waitForSelector('button[type="submit"]',{timeout:2000})
await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

 

//------------------------------search---------------------------------


 











const  HotelsPromo= await page.evaluate(()=>{
    
   
    
    let tab_ch= Array.from(document.querySelectorAll(".a447b19dfd")).map(x=>{return x.textContent.trim()})
    console.log("🚀 ~ HotelsPromo ~ tabch:", tab_ch)
    // let rate=[]
    // let nbrOfReviews=[]
    
    
    // for(let i=0;i<tab_ch.length-1;i++){
       

    // }
    
 
     
   
    
    // let names =Array.from(document.querySelectorAll(".span_lib_hot")).map(x=>{return{ name:x.textContent.trim()}})
    // let HotelsPromo=[]
    // for(let i=0;i<prices.length;i++){
    //     HotelsPromo.push({name:names[i].name,olde_price:old_prices[i].old_prix,actual_price:prices[i].actual_prix,rate:rate[i]})
    // }
    // return HotelsPromo
    
})
 


// browser.close() 
   
     
} 
 
console.log("🚀 ~ process.env.urlBooking:", process.env.urlBooking) 
getPrice(process.env.urlBooking)

