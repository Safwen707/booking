const mongoose = require("mongoose");
const hotelSchema=new mongoose.Schema({
   nom:String,
   prix:String,
   date_prix:String,
   lieu:String,
   imgEtoileSrc:String,
   imgHoteleSrc:String,


   
    
});
const hotel= new mongoose.model("hotel",hotelSchema);


module.exports=hotel;