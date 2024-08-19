
require('dotenv').config();

const puppeteer=require('puppeteer')
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

async function getPrice(url,destination,date_depart,date_arrivee,nbrAdulte,nbrEnfant){
   
    
  
const browser=await puppeteer.launch({
    headless:false,//tet7al fenetre 9odemk     
})  
console.log('Browser launched.');

const page=await browser.newPage()
console.log('New page created.');

 await page.goto(url)
console.log('Navigated to target URL.');
    



//------------------------------destination---------------------------------
await page.waitForSelector("#search")     
await page.click("#search")
await page.waitForSelector("#ville_des")     
await page.$eval('#ville_des',(e,destination) => {e.value=destination },destination);

//------------------------------arrivé---------------------------------
await page.waitForSelector("#arrivee.v37_73")     
await page.click("#arrivee.v37_73")
await page.waitForSelector("#depart") //ma9loubin fe site
await page.$eval('#depart',(e,date_arrivee) => {e.value=date_arrivee},date_arrivee);
await page.click("#arrivee.v37_73")

//------------------------------depart---------------------------------

await page.waitForSelector(".col_dep") 
await page.click(".col_dep")
await page.waitForSelector("input#checkout.checkout") 
await page.$eval('input#checkout.checkout',(e,date_depart) => {e.value=date_depart},date_depart); 

//------------------------------chambre/adultes/enfants---------------------------------

await page.waitForSelector("#chdest") 
await page.click("#chdest")
await delay(3000)
await page.waitForSelector("#adultes1") 
await page.$eval('#adultes1',(e,nbrAdulte) => e.value=nbrAdulte,nbrAdulte); 
await page.waitForSelector("#enfants1")
await page.$eval('#enfants1',(e,nbrEnfant) =>{ e.value=nbrEnfant},nbrEnfant);


switch (nbrEnfant) {
    case 1:
        await page.waitForSelector("#age1_1") 
        await page.select('#age1_1', `${process.env.ageEnfant1}`)
      break;
    case 2:
        await page.waitForSelector("#age1_1") 
        await page.select('#age1_1', `${process.env.ageEnfant1}`)
        await page.waitForSelector("#age1_2") 
        await page.select('#age1_2', `${process.env.ageEnfant2}`)
      break;
    default:
        await page.waitForSelector("#age1_1") 
        await page.select('#age1_1', `${process.env.ageEnfant1}`)
        await page.waitForSelector("#age1_2") 
        await page.select('#age1_2',`${process.env.ageEnfant2}`)
        await page.waitForSelector("#age1_3") 
        await page.select('#age1_3', `${process.env.ageEnfant3}`)
      
}


//------------------------------search---------------------------------
await page.waitForSelector(".v194_22") 
await page.click(".v194_22")
await delay(2000)
// -----------------que les hotels disponible--------
await page.waitForSelector("#btn_filtre_hotel_dispo_bleu") 
await page.click("#btn_filtre_hotel_dispo_bleu")
await delay(2000) 









const  HotelsPromo= await page.evaluate(()=>{
    
    let prices=[]
    let prices1= Array.from(document.querySelectorAll(".prix_tot")).map(x=>{return{ actual_prix:x.textContent.trim()}})
    for(p of prices1){
        
        if(p.actual_prix!=="TND"){
            prices.push(p)
    
        }
    }
    
     
    let old_prices=[]
    let old_prices1=Array.from(document.querySelectorAll(".prix_barre")).map(x=>{return{ old_prix:x.textContent.trim()}})
    for(p of old_prices1){
        if(p.old_prix!=="TND"){
            old_prices.push(p)
        }
    }
    
    let names =Array.from(document.querySelectorAll(".span_lib_hot")).map(x=>{return{ name:x.textContent.trim()}})
    let HotelsPromo=[]
    for(let i=0;i<prices.length;i++){
        HotelsPromo.push({name:names[i].name,olde_price:old_prices[i].old_prix,actual_price:prices[i].actual_prix})
    }
    return HotelsPromo
    
})
 

console.log("🚀 ~ getPrice ~ HotelsPromo:", HotelsPromo)

//  browser.close() 
   
return HotelsPromo   
} 
 
module.exports={getPrice}