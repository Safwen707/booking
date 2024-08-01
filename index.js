const puppeteer = require("puppeteer");
require("dotenv").config();
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}






// async function getPrice(url) {
//   const browser = await puppeteer.launch({
//     headless: false,
//   });
//   console.log("Browser launched.");

//   const page = await browser.newPage();
//   console.log("New page created.");

//   await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
//   console.log("Navigated to target URL.");
 
//   //-------------------bouton x-----------------
//   await page.waitForSelector(
//     "#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg"
//   );
//   await page.click(
//     "#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg"
//   );
//   console.log("onglet fermé");
//   //-------------------destination-----------------
//    await page.type('input[name="ss"]', "douz", { delay: 500 });
//    console.log("Typed destination 'Sousse'.");

//   //-------------------autocomplete result -----------------
//   await page.waitForSelector("#autocomplete-result-0");
//   await page.click("#autocomplete-result-0", { timout: 100 });
//   console.log("Selected autocomplete result.");

//   //-------------------date-----------------
//   await page.waitForSelector("button.ead010d0b7.caf094216b.e37cfa350e");
//   await page.click("button.ead010d0b7.caf094216b.e37cfa350e");

//   //-------------------search-----------------
//   await page.waitForSelector('button[type="submit"]');
//   await page.focus('button[type="submit"]', { delay: 100 });
//   await page.click('button[type="submit"]', { delay: 100 });

//   console.log("search");

//   // ---------------------------------hotelsNumber----------------------------
//   await page.waitForSelector(
//     "#bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.eda0d449dc.a45957e294 > h1"
//   );
//   let hotelsNumber = await page.$eval(
//     "#bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.eda0d449dc.a45957e294 > h1",
//     (el) => {
//       return parseInt(el.innerText.split(" ")[1]);
//     }
//   );
//   console.log("🚀 ~ getPrice ~ hotelsNumber:", hotelsNumber);

//   // --------------------click all the load more buttons-------------
//   const load_more_selector =
//     "#bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.d830fa48ad.db402c28f2 > div.f9958fb57b > div.e01df12ddf.d399a62c2a > button";
//   let load_more = true;
//   while (load_more) {
//     await page.evaluate(() => {
//       window.scrollTo(0, document.body.scrollHeight);
//     });
//     try {
//       await page.waitForSelector(load_more_selector);
//       await page.click(load_more_selector);
//     } catch (err) {
//       console.log("wait for 30 seconde");
//       load_more = false;
//     }
//   }

//   const selector_box = "[data-testid=property-card-container]";
//   const selector_title = "[data-testid=title]";
//   const selector_rate = "[data-testid=review-score]";
//   const selector_title_link="[data-testid=title-link]"
//   let titles = [];
  
//   for (let i = 0; i < hotelsNumber; i++) {
//     {
//       await delay(50);
//       titles = await page.evaluate(
//         (titles, selector_title, selector_rate, selector_box,selector_title_link, i) => {
//           // console.log(Array.from(document.querySelectorAll(selector)).length); //taille yetbadl kol 25 hotel(pagination)
//           const box = document.querySelectorAll(selector_box)[i]; //element html fih l box w les div lkol

//           const title_element = box.querySelectorAll(selector_title)[0]; //elemet html fih e title
          
//           const rate_element = box.querySelectorAll(selector_rate)[0];

//           const title_link_element=box.querySelectorAll(selector_title_link)[0];
        
//           if (box) {
//             let title = title_element.textContent.trim();
//             let title_link=title_link_element.getAttribute('href')
//             let rateAndReviews; // s'il exist elle est de la forme "Scored 9.3 9.3very Good 4 reviews""Scored 9.3 9.3Wonderful 4 reviews"
//             typeof rate_element != "undefined"
//               ? (rateAndReviews = rate_element.textContent.trim())
//               : (rateAndReviews = "new : not rated yet");
//             let hotel;
//             if (rateAndReviews != "new : not rated yet") {
              
//               let rate_note = parseInt(rateAndReviews.split(" ")[1]);
//               let reviews_nbr;
//               !Number.isNaN(parseInt(rateAndReviews.split(" ")[3]))
//                 ? (reviews_nbr = (rateAndReviews.split(" ")[3]))
//                 : (reviews_nbr = (rateAndReviews.split(" ")[4])); // ki tebda  feha "very goode" wella  "review score"
//                 if (reviews_nbr.includes(',')) {
//                   const commaIndex = reviews_nbr.indexOf(',');
//                   reviews_nbr = reviews_nbr.slice(0, commaIndex) + reviews_nbr.slice(commaIndex + 1);
//                 }//traiter le cas ou le nbr de view est  >1000  1.110=1110 et non 1
                
//               hotel = {
//                 name: title,
//                 rate_note: rate_note,
//                 reviews_nbr: parseInt(reviews_nbr),
//                 link:title_link
//               };
//             } else {
//               hotel = { name: title, rate_note: NaN, reviews_nbr: NaN ,link:title_link};
//             }
//             console.log("🚀 ~ getPrice ~ get_rate_details(title_link):")
            
            
//             titles.push(hotel);
//             console.log("🚀 ~ awaitpage.evaluate ~ titles1:", titles);
//             box.scrollIntoView(); //kol element temchilou wa7dou
//           }
           

//           return titles;
//         },
//         titles,
//         selector_title,
//         selector_rate,
//         selector_box,
//         selector_title_link,
        
//         i
//       );
//     }
//   }
// }

// let hotels=getPrice(process.env.urlBooking);
hotels=[
  {
      "name": "El Mouradi Douz",
      "rate_note": 7,
      "reviews_nbr": 1179,
      "link": "https://www.booking.com/hotel/tn/el-mouradi-douz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=1&hapos=1&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524425&from=searchresults"
  },
  {
      "name": "Grand Sud, la maison de sable",
      "rate_note": 9,
      "reviews_nbr": 254,
      "link": "https://www.booking.com/hotel/tn/la-maison-de-sable.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=2&hapos=2&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524425&from=searchresults"
  },
  {
      "name": "Camp Mars",
      "rate_note": 8,
      "reviews_nbr": 81,
      "link": "https://www.booking.com/hotel/tn/camp-mars.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=3&hapos=3&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524425&from=searchresults"
  },
  {
      "name": "Faima",
      "rate_note": 9,
      "reviews_nbr": 12,
      "link": "https://www.booking.com/hotel/tn/faima-douz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=4&hapos=4&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from_sustainable_property_sr=1&from=searchresults"
  },
  {
      "name": "Garden12 Outdoor & More",
      "rate_note": 9,
      "reviews_nbr": 2,
      "link": "https://www.booking.com/hotel/tn/garden12-outdoor-amp-more.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=5&hapos=5&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults"
  },
  {
      "name": "Maison Proche De Désert Douz",
      "rate_note": 8,
      "reviews_nbr": 117,
      "link": "https://www.booking.com/hotel/tn/maison-proche-de-desert.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=6&hapos=6&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults"
  },
  {
      "name": "The Residence Douz",
      "rate_note": 9,
      "reviews_nbr": 7,
      "link": "https://www.booking.com/hotel/tn/the-residence-douz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=7&hapos=7&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults"
  },
  {
      "name": "Residence Nour douz",
      "rate_note": 10,
      "reviews_nbr": 2,
      "link": "https://www.booking.com/hotel/tn/residence-nour-douz-douz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=8&hapos=8&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults"
  },
  {
      "name": "CAMP ABDELMOULA",
      "rate_note": 8,
      "reviews_nbr": 61,
      "link": "https://www.booking.com/hotel/tn/camp-abdelmoula.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=9&hapos=9&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults"
  },
  {
      "name": "Dar alibaba",
      "rate_note": null,
      "reviews_nbr": null,
      "link": "https://www.booking.com/hotel/tn/dar-alibaba.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=10&hapos=10&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults"
  },
  {
      "name": "Dessine-moi un Chameau",
      "rate_note": 1,
      "reviews_nbr": 1,
      "link": "https://www.booking.com/hotel/tn/dessine-moi-un-chameau-douz3.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=11&hapos=11&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults"
  },
  {
      "name": "Dessine-moi un Chameau",
      "rate_note": null,
      "reviews_nbr": null,
      "link": "https://www.booking.com/hotel/tn/dessine-moi-un-chameau-douz4.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=12&hapos=12&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults"
  },
  {
      "name": "Tente et Restaurant ElBey",
      "rate_note": 8,
      "reviews_nbr": 69,
      "link": "https://www.booking.com/hotel/tn/tente-elbey.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=13&hapos=13&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults"
  },
  {
      "name": "Dessine-moi un Chameau",
      "rate_note": null,
      "reviews_nbr": null,
      "link": "https://www.booking.com/hotel/tn/dessine-moi-un-chameau-douz-tunisia.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=14&hapos=14&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults"
  },
  {
      "name": "Private Camp25km-from DOUZ",
      "rate_note": 8,
      "reviews_nbr": 19,
      "link": "https://www.booking.com/hotel/tn/sahara-douz-dwz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=15&hapos=15&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from_sustainable_property_sr=1&from=searchresults"
  },
  {
      "name": "Résidences Porte de désert Douz",
      "rate_note": 6,
      "reviews_nbr": 2,
      "link": "https://www.booking.com/hotel/tn/residences-porte-de-desert-douz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=16&hapos=16&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults"
  }
]
async function get_rate_details(hotels){
   const selector_details='[data-testid=review-subscore]'
   const s="#b2hotelPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div > div.f82f96f550 > div > div:nth-child(3) > div.adc8292e09.ea1e323a59.cab35cf0da.fbe4119cc7.f795ed9755.e3471aba6c"
    
  for(let i=0;i<2;i++){
    
    if(hotels[i].rate_note!='null'){
      let url=hotels[i].link
      const browser = await puppeteer.launch({
            headless: false,
          });
          console.log("Browser launched.");
        
          const page = await browser.newPage();
          console.log("New page created.");
        
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
      console.log("Navigated the hotel .")
      let rate_details={}
      await page.waitForSelector('[data-testid=review-score-right-component]');
      await page.focus('[data-testid=review-score-right-component]', { delay: 100 });
      await page.click('[data-testid=review-score-right-component]', { delay: 100 });
      await page.evaluate((rate_details,selector_details,s)=>{
       
        let details_box = (document.querySelectorAll(s))[0]; 
        console.log("🚀 ~ awaitpage.evaluate ~ details_box :", details_box )
        // let details = (details_box.querySelectorAll(selector_details))
        // console.log("🚀 ~ awaitpage.evaluate ~ details:", details)

        // rate_details={Staff:Staff,Facilities:Facilities,Cleanliness:Cleanliness,Comfort:Comfort,Value_for_money:Value_for_money,location:location,Free_Wifi:Free_Wifi}

      },rate_details,selector_details,s)
      
    }
    

  }
  


}
get_rate_details(hotels)