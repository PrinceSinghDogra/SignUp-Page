const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// app.use(bodyParser.json);
app.use(cors());

// app.use(bodyParser.urlencoded ({extended: true}));

app.post("/employees", async(req, res) => {
    console.log(req.body);
})

app.listen(3001, ()=>  {
    console.log("Server started at code 3000");
})