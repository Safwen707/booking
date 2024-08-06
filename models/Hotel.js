const mongoose = require("mongoose");
const hotelSchema=new mongoose.Schema({
   name:String,
   rate_note:Number,
   reviews_nbr:Number,
   link:String,
   rate_details:Object,
   reviews_details:Array


   
    
});
const hotel= new mongoose.model("hotel",hotelSchema);


module.exports=hotel;