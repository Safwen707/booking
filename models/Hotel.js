const mongoose = require("mongoose");
const hotelSchema=new mongoose.Schema({
   name:String,
   rate_note:Number,
   reviews_nbr:Number,
   rate_details:Object

   
    
});
const hotel= new mongoose.model("hotel",hotelSchema);


module.exports=hotel;