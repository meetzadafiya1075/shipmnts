const mongoose = require("mongoose");
const vesselSchema  = new mongoose.Schema(
    {
        id:{
            type:String,
            unique:true,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        vessel_number:{
            type:String,
            unique:true,
            required:true
        },
        capacity:{
            type:Number,
            required:true,
            min:1
        }
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("vessel",vesselSchema);