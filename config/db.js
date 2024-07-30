const mongoose = require('mongoose')
const linkDatabase = () => {
         mongoose.connect('mongodb://localhost:27017/dbHotel')
         .then(
            ()=>{
                console.log(`MongoDB Connected : `)
            }
        )
         .catch (
            (err)=>
                {console.log(err)

                }
            ) 
        }

module.exports = linkDatabase
