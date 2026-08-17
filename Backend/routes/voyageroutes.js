const express = require("express");
const router = express.Router();

const{
    createvoyage
}=require("../controllers/voyagecontroller");
router.post("/voyages",createvoyage);
module.exports=router;