const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 mongoose.connect("mongodb+srv://princesinghdogra100:1234@employeedb.mc9dkec.mongodb.net/").then(()=>{
      console.log("the Database is connected successfully");
}).catch((e)=>{
      console.log("there is an error in database connection",e);

});
 
const employeeData = new mongoose.Schema({
    Name:{
        type:String,
        require:true,
    },
    Department:{
        type:String,
        require:true,
    },
    Salary:{
        type:Number,
        require:true,
}
});

 const EMPLOYEEDATA = mongoose.connection.model("employeedata",employeeData);
 app.get("/read",async(req,res)=>{
  const data=await EMPLOYEEDATA.find({});
  console.log("this is our data",data);
  res.send(data);
  

 })
 app.post("/create",(req,res)=>{
    console.log(req.body);
    try{
    const {Name,Department,Salary}= req.body;
    console.log(Name,Department,Salary);
    const values = new EMPLOYEEDATA(req.body);
    values.save().then(()=>{
        console.log("Data is saved.");
    }).catch((e)=>{
        console.log("there is an error comming while saving data in database.")
    })
    res.send({"message":"The Data is saved"});
    
 }catch(e){
    console.log(e);
    res.send({"message":"The Data is Not Saved"});
    
 }
 })
 app.get("/readalluser", async (req, res) => {
    try {
      const userData = await user.find({});
      // console.log("userData",userData)
      res.send(userData);
    } catch (error) {
      res.send(error);
    }
  });
 app.get("/read/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const userData = await user.findById({ _id: id });
      console.log("this is my single data", userData);
      res.send(userData);
    } catch (error) {
      res.send(error);
    }
  });
 app.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const userData = await EMPLOYEEDATA.findByIdAndDelete({ _id: id });
      res.send(userData);
    } catch (error) {
      res.send(error);
    }
  });

app.listen(3001,()=>{
    console.log("server started at port number 3001");
})
