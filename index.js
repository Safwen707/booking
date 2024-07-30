
const puppeteer = require('puppeteer');
require('dotenv').config();

async function getPrice(url) {
    const browser = await puppeteer.launch({
        headless: false,
        
    });  
    console.log('Browser launched.');

    const page = await browser.newPage();
    console.log('New page created.');

     
    await page.goto(url, { waitUntil: 'networkidle2' ,timeout: 60000 });
    console.log('Navigated to target URL.');

     //-------------------bouton x-----------------
    //  await page.waitForSelector("#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg");
    //  await page.click("#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg");    
    //   console.log("onglet fermé")
    //-------------------destination-----------------
    await page.type('input[name="ss"]', 'Sousse', { delay: 700 });
    console.log("Typed destination 'Sousse'.");

    //-------------------autocomplete result -----------------
    await page.waitForSelector('#autocomplete-result-0');
    await page.click('#autocomplete-result-0',{timout:700});
    console.log("Selected autocomplete result.");

    //-------------------date-----------------
    await page.waitForSelector('button.ead010d0b7.caf094216b.e37cfa350e');
    await page.click('button.ead010d0b7.caf094216b.e37cfa350e');

    //-------------------search-----------------
    await page.waitForSelector('button[type="submit"]');
    await page.focus('button[type="submit"]',{delay: 700})
    await page.click('button[type="submit"]',{delay: 700})
    console.log("search")
    // await Promise.all([
    //     page.click('button[type="submit"]'),
        
    // ]);














 
// const  HotelsPromo= await page.evaluate(()=>{
    
   
    
//     let tab_ch= Array.from(document.querySelectorAll(".a447b19dfd")).map(x=>{return x.textContent.trim()})
//     console.log("🚀 ~ HotelsPromo ~ tabch:", tab_ch)
//     // let rate=[]
//     // let nbrOfReviews=[]
    
    
//     // for(let i=0;i<tab_ch.length-1;i++){
       

//     // }
    
 
     
   
    
//     // let names =Array.from(document.querySelectorAll(".span_lib_hot")).map(x=>{return{ name:x.textContent.trim()}})
//     // let HotelsPromo=[]
//     // for(let i=0;i<prices.length;i++){
//     //     HotelsPromo.push({name:names[i].name,olde_price:old_prices[i].old_prix,actual_price:prices[i].actual_prix,rate:rate[i]})
//     // }
//     // return HotelsPromo
    
// })
 


// browser.close() 
   
     
} 
 
getPrice(process.env.urlBooking)

