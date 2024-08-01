const puppeteer = require("puppeteer");
require("dotenv").config();
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
async function getPrice(url) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  console.log("Browser launched.");

  const page = await browser.newPage();
  console.log("New page created.");

  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  console.log("Navigated to target URL.");

  //-------------------bouton x-----------------
  await page.waitForSelector(
    "#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg"
  );
  await page.click(
    "#b2indexPage > div.a1b9d2f057.c20dffcd7d > div > div > div > div.f39d206191 > div.d5b096843d.a3b6061a26.f3ec6922b3 > div > button > span > span > svg"
  );
  console.log("onglet fermé");
  //-------------------destination-----------------
  await page.type('input[name="ss"]', "douz", { delay: 500 });
  console.log("Typed destination 'Sousse'.");

  //-------------------autocomplete result -----------------
  await page.waitForSelector("#autocomplete-result-0");
  await page.click("#autocomplete-result-0", { timout: 100 });
  console.log("Selected autocomplete result.");

  //-------------------date-----------------
  await page.waitForSelector("button.ead010d0b7.caf094216b.e37cfa350e");
  await page.click("button.ead010d0b7.caf094216b.e37cfa350e");

  //-------------------search-----------------
  await page.waitForSelector('button[type="submit"]');
  await page.focus('button[type="submit"]', { delay: 100 });
  await page.click('button[type="submit"]', { delay: 100 });

  console.log("search");

  // ---------------------------------hotelsNumber----------------------------
  await page.waitForSelector(
    "#bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.eda0d449dc.a45957e294 > h1"
  );
  let hotelsNumber = await page.$eval(
    "#bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.eda0d449dc.a45957e294 > h1",
    (el) => {
      return parseInt(el.innerText.split(" ")[1]);
    }
  );
  console.log("🚀 ~ getPrice ~ hotelsNumber:", hotelsNumber);

  // --------------------click all the load more buttons-------------
  const load_more_selector =
    "#bodyconstraint-inner > div:nth-child(8) > div > div.caa83e2398 > div.a84de7f213 > div.b9687b0063 > div.d830fa48ad.db402c28f2 > div.f9958fb57b > div.e01df12ddf.d399a62c2a > button";
  let load_more = true;
  while (load_more) {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    try {
      await page.waitForSelector(load_more_selector);
      await page.click(load_more_selector);
    } catch (err) {
      console.log("wait for 30 seconde");
      load_more = false;
    }
  }

  const selector_box = "[data-testid=property-card-container]";
  const selector_title = "[data-testid=title]";
  const selector_rate = "[data-testid=review-score]";
  let titles = [];

  for (let i = 0; i < hotelsNumber; i++) {
    {
      await delay(100);
      titles = await page.evaluate(
        (titles, selector_title, selector_rate, selector_box, i) => {
          // console.log(Array.from(document.querySelectorAll(selector)).length); //taille yetbadl kol 25 hotel(pagination)
          const box = document.querySelectorAll(selector_box)[i]; //element html fih l box w les div lkol
          const title_element = box.querySelectorAll(selector_title)[0]; //elemet html fih e title
          const rate_element = box.querySelectorAll(selector_rate)[0];

          if (box) {
            let title = title_element.textContent.trim();
            let rateAndReviews; // s'il exist elle est de la forme "Scored 9.3 9.3very Good 4 reviews""Scored 9.3 9.3Wonderful 4 reviews"
            typeof rate_element != "undefined"
              ? (rateAndReviews = rate_element.textContent.trim())
              : (rateAndReviews = "new : not rated yet");
            let hotel;
            if (rateAndReviews != "new : not rated yet") {
              
              let rate_note = parseInt(rateAndReviews.split(" ")[1]);
              let reviews_nbr;
              !Number.isNaN(parseInt(rateAndReviews.split(" ")[3]))
                ? (reviews_nbr = (rateAndReviews.split(" ")[3]))
                : (reviews_nbr = (rateAndReviews.split(" ")[4])); // ki tebda  feha "very goode" wella  "review score"
                if (reviews_nbr.includes(',')) {
                  const commaIndex = reviews_nbr.indexOf(',');
                  reviews_nbr = reviews_nbr.slice(0, commaIndex) + reviews_nbr.slice(commaIndex + 1);
                }//traiter le cas ou le nbr de view est  >1000  1.110=1110 et non 1
                
              hotel = {
                name: title,
                rate_note: rate_note,
                reviews_nbr: parseInt(reviews_nbr),
              };
            } else {
              hotel = { name: title, rate_note: NaN, reviews_nbr: NaN };
            }
            titles.push(hotel);
            console.log("🚀 ~ awaitpage.evaluate ~ titles1:", titles);
            box.scrollIntoView(); //kol element temchilou wa7dou
          }

          return titles;
        },
        titles,
        selector_title,
        selector_rate,
        selector_box,
        i
      );
    }
  }
}

getPrice(process.env.urlBooking);
