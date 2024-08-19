const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const Booking_functions = require("./Booking_functions");
const TunisieBooking_functions = require("./TunisieBooking_functions");
const getGlobalRate = Booking_functions.getGlobalRate;
const get_rate_details = Booking_functions.get_rate_details;
const getPrice = TunisieBooking_functions.getPrice;
// Middleware pour traiter les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour servir le formulaire HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "formulair.html"));
}); // si vous avez un fichier index.js dans ~ app.get ~ __dirname: C:\Users\ENSI\Desktop\booking, alors __dirname sera ~ app.get ~ __dirname: C:\Users\ENSI\Desktop\booking
console.log(
  "🚀 ~ app.get ~ path.join(__dirname, 'front', 'formulair.html'):",
  path.join(__dirname, "front", "formulair.html")
);
console.log("🚀 ~ app.get ~ __dirname:", __dirname);
// Route pour traiter les données du formulaire et le chemin total sera  C:\Users\ENSI\Desktop\booking\front\formulair.html
app.post("/submit", (req, res) => {
  const destination = req.body.destination;
  const siteLink = req.body["site-link"];
  const date_depart=req.body["check-out"]
  const date_arrive=req.body["check-in"]

//   console.log("Destination:", destination);
//   console.log("Lien du site à scraper:", siteLink);
  if (siteLink == process.env.urlBooking) {
    const test = async (destination, siteLink) => {
      //let destination = "sidi bou said";
      console.log("🚀 ~ test ~ destination:", destination);
      let hotels = await getGlobalRate(siteLink, destination);
      console.log("__________________________________________");
      let Hotels = await get_rate_details(hotels);
      var fs = require("fs");
      const dir = path.join(__dirname, "fichiers_hotels_JSON");
      const filePath = path.join(dir, `Hotels_${destination}.json`);
      var HotelString = JSON.stringify(Hotels);
      // Utiliser appendFileSync pour ajouter les données au fichier
      await fs.appendFileSync(filePath, HotelString + "\n", (err) => {
        if (err) {
          console.error("Error appending to file:", err);
        } else {
          console.log("File has been appended");
        }
      });
      res.send(HotelString);

      console.log(
        `Hotels data has been appended to Hotels_${destination}.json successfully.`
      );

      console.log("🚀 ~ Hotels:", Hotels);
      console.log("__________________________________________");
    };
    test(destination, siteLink);
  } else if (siteLink == process.env.urlTunisieBooking) {
    const test = async function(url,destination,date_depart,date_arrivee,nbrAdulte,nbrEnfant) {
      let Hotels=await getPrice(url,destination,date_depart,date_arrivee,nbrAdulte,nbrEnfant)
      var fs = require("fs");
      const dir = path.join(__dirname, "fichiers_hotels_TB_JSON");
      const filePath = path.join(dir, `Hotels_${destination}_${date_arrivee.replace(/\//g, '-')}_${date_depart.replace(/\//g, '-')}.json`);
      var HotelString = JSON.stringify(Hotels);
      // Utiliser appendFileSync pour ajouter les données au fichier
      await fs.appendFileSync(filePath, HotelString + "\n", (err) => {
        if (err) {
          console.error("Error appending to file:", err);
        } else {
          console.log("File has been appended");
        }
      });
      res.send(HotelString);
  
  }
  test(siteLink,destination,date_depart,date_arrive,2,1)
    
      
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
