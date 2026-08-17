const Vessel = require("../models/vessel");
const Voyage = require("../models/voyage");

const createvoyage = async(req,res)=>{
    try{
        const{vessel_id,voyage_number,destination}=req.body;
        if(!vessel_id||!voyage_number||!destination){
            return res.status(400).json({
                error:"VALIDATION_ERROR",
                message:"vessel_id, voyage_number and destination are required"
            });
        }
        const vessel=await Vessel.findOne({
            id:vessel_id
        });
        if(!vessel){
            return res.status(404).json({
                error:"VESSEL_NOT_FOUND",
                message:`No vessel found with id ${vessel_id}`
            });
        }
        const existingvoyage=await Voyage.findOne({
            voyage_number: voyage_number
        })
        if(existingvoyage){
            return res.status(409).json({
                error:"VOYAGE_ALREADY_EXISTS",
                message:`A voyage with number ${voyage_number} already exists`
            });
        }
        const count=await Voyage.countDocuments();
        const voyage1=await Voyage.create({
            id:`vy${count+1}`,
            vessel_id,
            voyage_number,
            destination,
            status:"planned",
            route:[],
            containers:[]
        });
        return res.status(201).json(voyage1);
    }
    catch(error){
        return res.status(500).json({
            error:"Internal error",
            message:error.message
        });
    }
}

module.exports={createvoyage};