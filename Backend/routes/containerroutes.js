const express = require("express");
const router = express.Router();

const{
    addcontainer
}=require("../controllers/containercontroller");
router.post("/voyage/:voyage_id/containers",addcontainer);
module.exports=router;