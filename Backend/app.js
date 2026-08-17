const express = require("express");
const vesselroutes = require("./routes/vesselroutes");
const voyageroutes = require("./routes/voyageroutes");
const containerroutes = require("./routes/containerroutes");

const app=express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.json({
        message:"running"
    });
});
app.use(vesselroutes);
app.use(voyageroutes);
app.use(containerroutes);
module.exports=app;