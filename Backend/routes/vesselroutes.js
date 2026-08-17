const express = require("express");
const router = express.Router();

const{
    createvessel
}=require("../controllers/vesselcontroller");
router.post("/vessels",createvessel);
module.exports=router;