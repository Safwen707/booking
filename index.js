
const puppeteer = require('puppeteer');
require('dotenv').config();
function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
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
     await page.waitForSelector("#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg");
     await page.click("#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg");    
      console.log("onglet fermé")
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
    await page.focus('button[type="submit"]',{delay: 500})
    await page.click('button[type="submit"]',{delay: 500})
    
    
    console.log("search")
   
   
 

    const scrollPageToBottom = async () => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(1000); // Adjust timeout as needed
    };
  
    
  




// hotel name #bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.d830fa48ad.db402c28f2 > div.f9958fb57b > div:nth-child(3) > div.d8ff70c6e0.bb80b6397f > div.c655c9a144 > div > div > div.c324bdcee4.ec7ca45eb7 > div > div:nth-child(1) > div > h3 > a > div.e037993315.f5f8fe25fa
// rating #bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.d830fa48ad.db402c28f2 > div.f9958fb57b > div:nth-child(3) > div.d8ff70c6e0.bb80b6397f > div.c655c9a144 > div > div > div:nth-child(2)
// ---------------------------------hotelsNumber----------------------------
await page.waitForSelector("#bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.eda0d449dc.a45957e294 > h1")
let hotelsNumber=await page.$eval("#bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.eda0d449dc.a45957e294 > h1",(el)=>{return parseInt(el.innerText.split(" ")[1])})
console.log("🚀 ~ getPrice ~ hotelsNumber:",(hotelsNumber))

// ---------------------------------title----------------------------

    
    
   


// for (let i=0;i<4;i++){
//     await page.waitForSelector("[data-testid=title]")
//   tab_titles1= await page.evaluate((tab_titles1,i)=>{
//     // ---------------------------------title----------------------------
  
//      let tab_titles= Array.from(document.querySelectorAll("[data-testid=title")).map(x=>{return x.textContent.trim()})
//      console.log("🚀 ~ tab_titles1=awaitpage.evaluate ~  tab_titles:",  tab_titles)
     
//      window.scrollBy(0,25*i)

//     return tab_titles1 
// },tab_titles1,i)}
const selector = '[data-testid=title]';
let titles=[]
let test = true
for (let i = 0; i < hotelsNumber; i++) {

  if(test)
    { await delay(100);
  titles= await page.evaluate(( titles,selector, i,test) => {
    console.log(Array.from(document.querySelectorAll(selector)).length)//taille yetbadl kol 25 hotel(pagination)
    
    const element = document.querySelectorAll(selector)[i];
    if(element) {
      console.log("🚀 ~ titles1=awaitpage.evaluate ~ element:", !!element)
      
      titles.push(element.textContent.trim())
      console.log("🚀 ~ awaitpage.evaluate ~ titles1:", titles)
      element.scrollIntoView();//kol element temchilou wa7dou
    }else{
      console.log("i'm here1")
      test=false
      
    }
    return titles
  }, titles, selector, i,test);}
  else{
    console.log("i'm here2")
    await page.waitForSelector('#bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.d830fa48ad.db402c28f2 > div.f9958fb57b > div.e01df12ddf.d399a62c2a > button');
    await page.click('#bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.d830fa48ad.db402c28f2 > div.f9958fb57b > div.e01df12ddf.d399a62c2a > button');
    console.log("load more")
    test=true
  }
    
}
     
    
     



// browser.close() 
   
     
} 
 
getPrice(process.env.urlBooking)

