// const voyage = require("../models/voyage");
const voyage=require("../models/voyage");

const addcontainer = async(req,res)=>{
    try{
        const{voyage_id}=req.params;
        const{
            container_number,
            destination,
            due_date,
            late_charge
        }=req.body;
        if(!container_number||
            !destination||
            !due_date||
            late_charge==undefined){
            return res.status(400).json({
                error:"VALIDATION_ERROR",
                message:"container_number, destination, due_date and late_charge are require"
            });
        }
        if(Number(late_charge)<0){
            return res.status(400).json({
                error:"VALIDATION_ERROR",
                message:"late_charge must be greater than 0"
            });
        }
        const voyage=await voyage.findOne({
            id:voyage_id
        })
        if(!voyage){
            return res.status(404).json({
                error:"VOYAGE_NOT_FOUND",
                message:`No voyage found with id ${voyage_id}`
            });
        }
        const existingcontainer = await voyage.findOne({
            "containers.container_number":container_number
        });
        if(existingcontainer){
            return res.status(409).json({
                error:"CONTAINER_ALREADY_EXISTS",
                message:`A container with number ${container_number} already exists`
            });
        }
        if(voyage.containers.length>=vessel.capacity){
            return res.status(409).json({
                error:"CAPACITY_EXCEEDED",
                message:`MV Example can carry only ${vessel.capacity} containers on one voyage`
            });
        }
        const container={
            container_number,
            destination,
            // due_date=new Date(due_date),
            late_charge: nUmber(late_charge),
            arrived_on:null,
        };
        voyage.containers.push(container);
        await voyage.save();
        return res.status(201).json(container);
    }
    catch(error){
        return res.status(500).json({
            error:"Internal error",
            message:error.message
        });
    }
}

module.exports={addcontainer};