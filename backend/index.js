import express from "express"//ES6 feature at the same time "type":"module" was type in package.json file for working this line. ES5-> const express = require("express")
import cors from "cors" //ES6 method 
import mongoose from "mongoose"

const app = express()

const PORT = 5000

//MiddelWare function 
app.use(express.json())
app.use(cors())

//mongoose is connected with connection link & todo(database)
mongoose.connect("mongodb://127.0.0.1:27017/todo").then(() =>
    console.log("Database Successfully connected"))
    .catch(() =>
        console.log("Database Failed to connect"))

//connect with model("here model name",{here put schema data},"here collection")
const Fruit = mongoose.model("fruitmodel", { name: String, }, "fruit")

//const fruit = ["Apple","Orange"]//This backend fruit array is come from frontend array list. passing frontend array list in backend.

app.get("/fruitlist", (req, res) => {
    //frontend request give a fruitlist, that time backend send database array(data)
    Fruit.find().then(function (retdata) {
        console.log(retdata)
        res.status(200).send(retdata)
    })
    //res.send(fruit)
})

app.post("/addfruit", (req, res) => {
    var newfruit = req.body.newfruit//frontend enterValue can stored in newfruit data
    //fruit.push(newfruit)
    const newaddFruit = new Fruit(
        {
            name: newfruit
        }
    )
    newaddFruit.save().then(() => console.log("Saved successfully"))
})

//Delete Fruits
app.post("/deletefruit", (req, res) => {
    const deleteFruit = req.body.id

    Fruit.findByIdAndDelete(deleteFruit).then(()=>
    {
        res.status(200).send("Deleted Successfully")
        console.log("Deleted Successfully")
    })
    .catch((err)=>
    {
        res.status(404).send("Failed to delete")
        console.log("Failed to delete",err)
    })
})

app.listen(PORT, () => {
    console.log("Server Started...", PORT)
})