import express from "express";
const app=express();
app.get("/",(req,res)=>res.json({mensaje:"Backend funcionando 🚀"}));
app.listen(3000,()=>console.log("Servidor corriendo"));