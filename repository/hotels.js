const axios = require ("axios")
const cheerio= require("cheerio")
const Hotel = require('../models/Hotel')
const hotel_data = []
async function getHotels (url) {
try{
    const {data}= await axios.get(url);
    const $ =cheerio.load (data);
    const box_produit = $("div.box_produit");
   
    box_produit.each(async function()
    {   
        const entet_produit =$(this).find("div.entete_produit");
        entet_produit.each(function(){
        nom =$(this).find (".bloc_titre").text().trim();
        prix =$(this).find (".prix_produit").text().trim()
        date_prix=$(this).find (".date_prix").text().trim()
        imgEtoileSrc = $(this).find('img').attr('src');
        lieu = $(this).find('span.adresse_hotel').text().trim()||""
        })

        img_hotel_in = $(this).find("div.img_hotel_in");
        img_hotel_in.each(function(){
            imgHoteleSrc=$(this).find('img.image_hotel').attr('data-src');
            // imgHoteleSrc=$("img.image_hotel").attr('src');
            // console.log("🚀 ~ img_hotel_in.each ~ imgHoteleSrc:", imgHoteleSrc)
        })
        
                // let newHotel= new Hotel({nom,prix,date_prix,lieu,imgEtoileSrc,imgHoteleSrc})
                // console.log("🚀 ~ getHotels ~ newHotel:", newHotel)
                // newHotel.save()
            
            
            
         
        
    });
   
}catch (error) {
    console.error(error);
}
    
}
module.exports = {getHotels};
// getHotels (mystery);