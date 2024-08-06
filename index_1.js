const puppeteer = require("puppeteer");
require("dotenv").config();
// function delay(time) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, time);
//   });
// }
// const type_destination = async function (page) {
//   await page.type('input[name="ss"]', "douz", { delay:400 });
//   console.log("Typed destination 'Sousse'.");
// };
// const autocomplete = async function (page) {
//   await page.waitForSelector("#autocomplete-result-0");
//   await page.click("#autocomplete-result-0", { timout: 100 });
//   console.log("Selected autocomplete result.");
// };
// const LoadMore = async function (load_more_selector,page) {
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
// };
// const get_hotels_number = async function (page) {
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
//   return hotelsNumber;
// };
// const search = async function (page) {
//   await page.waitForSelector('button[type="submit"]');
//   await page.focus('button[type="submit"]', { delay: 100 });
//   await page.click('button[type="submit"]', { delay: 100 });
//   console.log("search");
// };

// async function getGlobalRate(url) {
//   const browser = await puppeteer.launch({
//     headless: false,
//     args: ['--lang=en-GB,en']
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
//   await type_destination(page);

//   //-------------------autocomplete result -----------------
//   autocomplete(page);

//   //-------------------date-----------------
//     await page.waitForSelector("button.ead010d0b7.caf094216b.e37cfa350e");
//   await page.click("button.ead010d0b7.caf094216b.e37cfa350e");
// await page.click("button.ead010d0b7.caf094216b.e37cfa350e");

//   //-------------------search-----------------
//   await search(page);
//   // ---------------------------------hotelsNumber----------------------------
//   let hotelsNumber = await get_hotels_number(page);
//   // --------------------click all the load more buttons-------------
//   const load_more_selector =
//     "#bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.d830fa48ad.db402c28f2 > div.f9958fb57b > div.e01df12ddf.d399a62c2a > button";
//     await LoadMore(load_more_selector,page);
//   //------------------selecting titles global_rate and link-----------------

//   const selector_box = "[data-testid=property-card-container]";
//   const selector_title = "[data-testid=title]";
//   const selector_rate = "[data-testid=review-score]";
//   const selector_title_link = "[data-testid=title-link]";
//   let hotels = [];

//   for (let i = 0; i < hotelsNumber; i++) {
//     {
//       await delay(50);
//       hotels = await page.evaluate(
//         (
//           hotels,
//           selector_title,
//           selector_rate,
//           selector_box,
//           selector_title_link,
//           i
//         ) => {
//           // console.log(Array.from(document.querySelectorAll(selector)).length); //taille yetbadl kol 25 hotel(pagination)
//           const box = document.querySelectorAll(selector_box)[i]; //element html fih l box w les div lkol

//           const title_element = box.querySelectorAll(selector_title)[0]; //elemet html fih e title

//           const rate_element = box.querySelectorAll(selector_rate)[0];

//           const title_link_element =
//             box.querySelectorAll(selector_title_link)[0];

//           if (box) {
//             let title = title_element.textContent.trim();
//             console.log("🚀 ~ getPrice ~ title:", title);
//             let title_link = title_link_element.getAttribute("href");
//             console.log("🚀 ~ getPrice ~ title_link:", title_link);
//             let rateAndReviews; // s'il exist elle est de la forme "Scored 9.3 9.3very Good 4 reviews""Scored 9.3 9.3Wonderful 4 reviews"

//             console.log("🚀 ~ getPrice ~ typeof(rate_element):", rate_element);

//             if (typeof rate_element != "undefined") {
//               rateAndReviews = rate_element.textContent.trim();
//               console.log("🚀 ~ getPrice ~ rateAndReviews:", rateAndReviews);
//             } else {
//               rateAndReviews = "new : not rated yet";
//             }

//             let hotel;

//             if (rateAndReviews != "new : not rated yet") {
//               let rate_note = parseInt(rateAndReviews.split(" ")[1]);

//               let reviews_nbr;
//               !Number.isNaN(parseInt(rateAndReviews.split(" ")[3]))
//                 ? (reviews_nbr = rateAndReviews.split(" ")[3])
//                 : (reviews_nbr = rateAndReviews.split(" ")[4]); // ki tebda  feha "very goode" wella  "review score"
//               if (reviews_nbr.includes(",")) {
//                 const commaIndex = reviews_nbr.indexOf(",");
//                 reviews_nbr =
//                   reviews_nbr.slice(0, commaIndex) +
//                   reviews_nbr.slice(commaIndex + 1);
//               } //traiter le cas ou le nbr de view est  >1000  1.110=1110 et non 1

//               hotel = {
//                 name: title,
//                 rate_note: rate_note,
//                 reviews_nbr: parseInt(reviews_nbr),
//                 link: title_link,
//               };
//             } else {
//               hotel = {
//                 name: title,
//                 rate_note: NaN,
//                 reviews_nbr: NaN,
//                 link: title_link,
//               };
//             }
//             // console.log("🚀 ~ getPrice ~ get_rate_details(title_link):")

//             hotels.push(hotel);
//             console.log("🚀 ~ awaitpage.evaluate ~ titles1:", hotels);
//             box.scrollIntoView(); //kol element temchilou wa7dou
//           }

//           return hotels;
//         },
//         hotels,
//         selector_title,
//         selector_rate,
//         selector_box,
//         selector_title_link,
//         i
//       );
//     }
//   }
// }
// let hotels = getGlobalRate(process.env.urlBooking);

const hotels = [
  {
    name: "El Mouradi Douz",
    rate_note: 7,
    reviews_nbr: 1179,
    link: "https://www.booking.com/hotel/tn/el-mouradi-douz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=1&hapos=1&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524425&from=searchresults",
  },
  {
    name: "Grand Sud, la maison de sable",
    rate_note: 9,
    reviews_nbr: 254,
    link: "https://www.booking.com/hotel/tn/la-maison-de-sable.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=2&hapos=2&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524425&from=searchresults",
  },
  {
    name: "Camp Mars",
    rate_note: 8,
    reviews_nbr: 81,
    link: "https://www.booking.com/hotel/tn/camp-mars.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=3&hapos=3&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524425&from=searchresults",
  },
  {
    name: "Faima",
    rate_note: 9,
    reviews_nbr: 12,
    link: "https://www.booking.com/hotel/tn/faima-douz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=4&hapos=4&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from_sustainable_property_sr=1&from=searchresults",
  },
  {
    name: "Garden12 Outdoor & More",
    rate_note: 9,
    reviews_nbr: 2,
    link: "https://www.booking.com/hotel/tn/garden12-outdoor-amp-more.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=5&hapos=5&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  },
  {
    name: "Maison Proche De Désert Douz",
    rate_note: 8,
    reviews_nbr: 117,
    link: "https://www.booking.com/hotel/tn/maison-proche-de-desert.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=6&hapos=6&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  },
  {
    name: "The Residence Douz",
    rate_note: 9,
    reviews_nbr: 7,
    link: "https://www.booking.com/hotel/tn/the-residence-douz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=7&hapos=7&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  },
  {
    name: "Residence Nour douz",
    rate_note: 10,
    reviews_nbr: 2,
    link: "https://www.booking.com/hotel/tn/residence-nour-douz-douz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=8&hapos=8&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  },
  {
    name: "CAMP ABDELMOULA",
    rate_note: 8,
    reviews_nbr: 61,
    link: "https://www.booking.com/hotel/tn/camp-abdelmoula.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=9&hapos=9&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  },
  {
    name: "Dar alibaba",
    rate_note: null,
    reviews_nbr: null,
    link: "https://www.booking.com/hotel/tn/dar-alibaba.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=10&hapos=10&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  },
  {
    name: "Dessine-moi un Chameau",
    rate_note: 1,
    reviews_nbr: 1,
    link: "https://www.booking.com/hotel/tn/dessine-moi-un-chameau-douz3.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=11&hapos=11&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  },
  {
    name: "Dessine-moi un Chameau",
    rate_note: null,
    reviews_nbr: null,
    link: "https://www.booking.com/hotel/tn/dessine-moi-un-chameau-douz4.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=12&hapos=12&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  },
  {
    name: "Tente et Restaurant ElBey",
    rate_note: 8,
    reviews_nbr: 69,
    link: "https://www.booking.com/hotel/tn/tente-elbey.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=13&hapos=13&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  },
  {
    name: "Dessine-moi un Chameau",
    rate_note: null,
    reviews_nbr: null,
    link: "https://www.booking.com/hotel/tn/dessine-moi-un-chameau-douz-tunisia.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=14&hapos=14&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  },
  {
    name: "Private Camp25km-from DOUZ",
    rate_note: 8,
    reviews_nbr: 19,
    link: "https://www.booking.com/hotel/tn/sahara-douz-dwz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=15&hapos=15&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from_sustainable_property_sr=1&from=searchresults",
  },
  {
    name: "Résidences Porte de désert Douz",
    rate_note: 6,
    reviews_nbr: 2,
    link: "https://www.booking.com/hotel/tn/residences-porte-de-desert-douz.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=16&hapos=16&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  },
]; //resultat dela premire fct

async function get_rate_details(hotels) {
  const selector_box =
    "div.adc8292e09.ea1e323a59.e035194de3.b2a732b674.fbe4119cc7";
  const selector_details = ".ace7a8247e.b8f7157bcc";
  let rate_details = {
    Staff: 0,
    Facilities: 0,
    Cleanliness: 0,
    Comfort: 0,
    Value_for_money: 0,
    location: 0,
    Free_Wifi: 0,
  };
  let review_details = {
    review_score: 0,
    review_date: "",
  };
  ; // elle contient plusieures review_details
  for (let i = 0; i < 1; i++) {
    let reviews_details = []
    //hotels.length
    if (hotels[i].rate_note != null) {
      //pur tester le hotels qui ont rating
      let url = hotels[i].link;
      //------------------------------ouvrir la page de l'hotel---------------------
      const browser = await puppeteer.launch({
        headless: false,
      });
      console.log("Browser launched.");
      const page = await browser.newPage();
      console.log("New page created.");
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
      console.log("Navigated the hotel .");
      //------------------------------ouvrir lafenetre des review---------------------
      await page.waitForSelector("[data-testid=review-score-right-component]");
      await page.focus("[data-testid=review-score-right-component]", {
        delay: 100,
      });
      await page.click("[data-testid=review-score-right-component]", {
        delay: 100,
      });
      //------------------------------fenetre des review apparus--------------------------

      //-----------------------selection de rate_details------------------------
      let j;
      //   rate_details = await page.evaluate(
      //     (rate_details, selector_details, selector_box, j) => {
      //       for (j = 0; j < 7; j++) {
      //         let details_box = document.querySelectorAll(selector_box)[j];
      //         // console.log("🚀 ~ get_rate_details ~ details_box:", details_box)
      //         let details = details_box.querySelectorAll(selector_details)[0]; //7.7 8.6 ....
      //         let key = Object.keys(rate_details)[j]; // staf Facilities.  ...
      //         rate_details[key] = details.textContent.trim();
      //         // console.log("🚀 ~ get_rate_details ~ details:", details)
      //         // console.log("🚀 ~ get_rate_details ~  rate_details:",  rate_details)
      //       }
      //       return rate_details;
      //     },
      //     rate_details,
      //     selector_details,
      //     selector_box,
      //     j
      //   )
      hotels[i]["rate_details"] = rate_details;
      //-----------------------selection de reviews_details------------------------
      let k;
      await page.waitForSelector("#reviewCardsSection");
      reviews_details = await page.evaluate(
        (review_details, reviews_details, k,j) => {
          
          let review_cards_selector = "[data-testid=review-cards]";
          let review_card_selector = "[data-testid=review-card]";
          let review_date_selector = "[data-testid=review-date]";
          let review_score_selector = "[data-testid=review-score]";
          const formate_date = function (date_string) {
            const date = new Date(date_string);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
            const year = date.getFullYear();
            date_string = `${day}/${month}/${year}`;
            return date_string;
          };
          const get_reviews_details = function (reviews_details) {
            let review_cards_array_element = Array.from(
              Window.querySelectorAll(review_cards_selector)
            )[0];
            console.log("🚀 ~ get_rate_details ~ review_cards_array_element:", review_cards_array_element)
            let review_cards_array=Array.from(review_cards_array_element.querySelectorAll(review_card_selector))
           
           
            for (k = 0; k < review_cards_array.length; k++) {
             
              let review_card = review_cards_array[k];
              
              let review_date = review_card
                .querySelectorAll(review_date_selector)[0]
                .textContent.trim(); // Reviewed: June 16, 2024
              review_date = review_date.split(": ")[1];

              review_date = formate_date(review_date);
             

              let review_score = parseInt(
                review_card
                  .querySelectorAll(review_score_selector)[0]
                  .textContent.trim()
                  .split(" ")[1]
              );
              

              review_details = {
                review_score: review_score,
                review_date: review_date,
              };
              reviews_details.push(review_details);
              
            }
            
            return reviews_details
          };
          let Window = document.querySelectorAll("#reviewCardsSection")[0];
          console.log(
            "🚀 ~ review_details=awaitpage.evaluate ~  window :",
            Window
          );
          let list_of_navigation = Window.querySelectorAll("ol")[0];
          console.log(
            "🚀 ~ review_details=awaitpage.evaluate ~ list_of_navigation:",
            list_of_navigation
          );
          if (list_of_navigation != undefined) {
            let ol_elements = Array.from(
              list_of_navigation.querySelectorAll("li")
            );
            console.log(
              "🚀 ~ review_details=awaitpage.evaluate ~ ol_elements:",
              ol_elements
            );
            let nbr_of_reviews_page = parseInt(
              ol_elements[ol_elements.length - 1].textContent.trim()
            );
            console.log(
              "🚀 ~ review_details=awaitpage.evaluate ~ nbr_of_reviews_page:",
              nbr_of_reviews_page
            );
            function delay(time) {
                return new Promise(function (resolve) {
                  setTimeout(resolve, time);
                });
              }
             const  wait =async(time)=>{
                await delay(time)
              }
                             
            for(j=0;j<3;j++){
                console.log(j)
                
                reviews_details = get_reviews_details(reviews_details);
                console.log("🚀 ~ get_rate_details ~ reviews_details:", reviews_details)
               
                wait(1500)
                 let next_page_selector='button.dba1b3bddf.e99c25fd33.aabf155f9a.f42ee7b31a.a86bcdb87f.e137a4dfeb.e2a8616b58'
                 console.log("🚀 ~ get_rate_details ~ next_page_selector:", next_page_selector)
                 
                let next_button= document.querySelector(next_page_selector)
                
                next_button.click()
                wait(10000) 
               
            }
                

          } else {
            console.log("list_of_navigation: undefined");
            reviews_details = get_reviews_details(reviews_details);
          }
          return reviews_details
        },
        review_details,
        reviews_details,
        k,
        j
      )
      ;
      hotels[i]["reviews_details"] = reviews_details;
    } else {
      hotels[i]["rate_details"] = {
        Staff: 0,
        Facilities: 0,
        Cleanliness: 0,
        Comfort: 0,
        Value_for_money: 0,
        location: 0,
        Free_Wifi: 0,
      };
    }
    // console.log("🚀 ~ get_rate_details ~ hotels:", hotels)
  }
  return hotels;
}

const test = async () => {
  let Hotels = await get_rate_details(hotels);
  console.log("🚀 ~ Hotels:", Hotels);
};
test();

obj = {
  name: "Dessine-moi un Chameau",
  rate_note: 1,
  reviews_nbr: 1,
  link: "https://www.booking.com/hotel/tn/dessine-moi-un-chameau-douz3.html?label=gen173nr-1FCAEoggI46AdIM1gEaOIBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKCxq61BsACAdICJDU5ZDg2M2VhLWZmNzYtNGM0Yi05NmVhLWNlZTNmMjFlNTQ1YtgCBeACAQ&aid=304142&ucfs=1&arphpl=1&dest_id=-724831&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=11&hapos=11&sr_order=popularity&srpvid=ada66984401c05c1&srepoch=1722524454&from=searchresults",
  rate_details: {
    Staff: "2,5",
    Facilities: "2,5",
    Cleanliness: "2,5",
    Comfort: "2,5",
    Value_for_money: "2,5",
    location: "2,5",
    Free_Wifi: "2,5",
  },
  review_details: {
    rate: 8,
    date: "",
  },
};