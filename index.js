const express = require("express")

const app = express()

app.use(express.json())

const userModel = require('./usermodel')

app.post('/addstudent', async (req,res)=>{
   try {
    const { names , emails ,batchs ,ages,   is_course_completeds } = req.body
    await userModel.create(
         {
             name : names ,
             email : emails,
             batch : batchs,
             age : ages ,
             is_course_completed : is_course_completeds
         })
     console.log("Users has been added")
     res.status(200).json ({
        message: "User successfully added",
     })
   } catch (error) {
    console.error("Error adding user:", error.message);
        res.status(500).json({
            "errormsg": "Internal Server Error" ,
            "error"  : error.message
        });
   }
}) 

app.get("/get-data",async (req,res)=>{
    try{
        let users = await userModel.find()
        res.status(200).json({
             "status" : 200,
             "success" : true,
             "message" : "data has been shown",
             "data" : users
        })
    }
    catch(error) {
        res.status(500).json({
            "status" : 500,
            "success" :false,
            "message" : error.message,
            "data" : null
       })
    }
})

app.post("/userwise",async (req,res)=>{
    const {id} = req.body
    try{
        let users = await userModel.findById(id)
        res.status(200).json({
             "status" : 200,
             "success" : true,
             "message" : "data has been shown",
             "data" : users
        })
    }
    catch(error) {
        res.status(500).json({
            "status" : 500,
            "success" :false,
            "message" : error.message,
            "data" : null
       })
    }
})
app.listen(4000)



// Why the Error Happens
// userModel.find() returns a Query object (which is like a promise, but with extra internal properties). Trying to JSON.stringify() it (which res.json() does internally) throws an error because of circular references inside that object.

// You fix it by waiting for the promise to resolve using await.

