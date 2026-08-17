const Vessel = require("../models/vessel");

const createvessel = async(req,res)=>{
    try{
        const{name,vessel_number,capacity}=req.body;
        if(!name||!vessel_number||capacity===undefined){
            return res.status(400).json({
                error:"VALIDATION_ERROR",
                message:"name, vessel_number and capacity are required"
            });
        }
        if(!Number.isInteger(capacity)||capacity<=0){
            return res.status(400).json({
                error:"VALIDATION_ERROR",
                message:"capacity must be a whole number greater than 0"
            });
        }
        const existingvessel=await Vessel.findOne({
            vessel_number:vessel_number
        });
        if(existingvessel){
            return res.status(409).json({
                error:"VESSEL_ALREADY_EXISTS",
                message:`A vessel with number ${vessel_number} already exists`
            });
        }
        const count = await Vessel.countDocuments();
        const newVessel=await Vessel.create({
            id:`v${count+1}`,
            name,
            vessel_number,
            capacity
        });
        return res.status(201).json(newVessel);
        
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            error:"Internal error",
            message:error.message
        });
    }
}

module.exports={createvessel};