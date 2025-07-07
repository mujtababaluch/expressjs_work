const express = require("express")

const app = express()

app.use(express.json())

const userModel = require('./usermodel')
const mongoose = require("mongoose")

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

app.get("/getuserdetails",async(req,res)=>{
    const {id} = req.params
    
    if(!mongoose.isValidObjectId(id)){
        return  res.status(400).json({
            "statuscode":400,
                "success":false,
                "message": "Bad Requeest",
                "data" : {
                    "message" : "please write vaild id"
                }
        })
    }
    try {
        const userdata = await userModel.findById(id)

        if(!userdata){
            return res.status(404).json({
                "statuscode":404,
                "success":false,
                "message": "User Not found",
                "data" : null
            })
        }
        return res.json({
            "status" : 200,
            "success" : true,
            "message" : "data has been shown",
            "data" :userdata
        })
    } catch (error) {
        return res.status(500).json({
                        "statuscode":500,
                        "success":false,
                        "message": "Internal Server Error",
                        "data" : {
                            "error" :error.message
                        }
                    })
    }
})
app.delete("/delete",async (req,res)=>{
    const {id} =  req.params
           if(!mongoose.isValidObjectId(id)){
           return res.status(404).json({
                "statuscode":404,
                "success":false,
                "message": "Bad Requeest",
                "data" : {
                    "message" : "please write vaild id"
                }
            })
        }
    try {
        const userdelete= await findByIdAndDelete(id)
        if(!userdelete){
            return res.status(404).json({
                "statuscode":404,
                "success":false,
                "message": "User Not found",
                "data" : null
            })
        }
        return res.json({
            "status" : 200,
            "success" : true,
            "message" : "User deleted",
        })
    } catch (error) {
        return res.status(500).json({
            "statuscode":500,
            "success":false,
            "message": "Internal Server Error",
            "data" : {
                "error" :error.message
            }
        })
    }
})
app.put("/update",async(req,res)=>{
    const { id,names , emails ,batchs ,ages,   is_course_completeds } = req.body
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({
             "statuscode":404,
             "success":false,
             "message": "Bad Requeest",
             "data" : {
                 "message" : "please write vaild id"
             }
         })
     }
    try {
        const userupdate =  await userModel.findByIdAndUpdate(id,{
            name :names,
            email :emails,
            batch : batchs,
            age :ages,
            is_course_completed : is_course_completeds
        },
        {new:true}
        )
        return res.json({
            "status" : 200,
            "success" : true,
            "message" : "re",
            "data" :userupdate
        })
    } catch (error) {
        return res.status(500).json({
            "statuscode":500,
            "success":false,
            "message": "Internal Server Error",
            "data" : {
                "error" :error.message
            }
        })
    }
})
// app.get("/getuserdetails", async (req,res)=>{
//     const {id} = req.query
//         if(!mongoose.isValidObjectId(id)){
//             res.status(404).json({
//                 "statuscode":404,
//                 "success":false,
//                 "message": "Bad Requeest",
//                 "data" : {
//                     "message" : "please write vaild id"
//                 }
//             })
//         }
//     try {
//        const  userdata = await  userModel.findById(id)
//        if(!userdata){
//         res.status(404).json({
//             "statuscode":404,
//             "success":false,
//             "message": "invaild user",
//             "data" : null
//         })
//        }
//        res.json({
//                     "statuscode":200,
//                     "success":true,
//                     "message": "data is feteched",
//                     "data" : userdata
//                 })
//     } catch (error) {
//         res.status(500).json({
//             "statuscode":500,
//             "success":false,
//             "message": "Internal Server Error",
//             "data" : {
//                 "error" :error.message
//             }
//         })
//     }
//  })

//  app.delete("/delete/:id",async(req,res)=>{
//     const {id} = req.params
//     try {
//             const userdata = await userModel.findByIdAndDelete(id)
//             res.json({
//                 "statuscode":200,
//                 "success":true,
//                 "message": "User is deleted",
                
//             })
//     } catch (error) {
//         res.status(500).json({
//             "statuscode":500,
//             "success":false,
//             "message": "Internal Server Error",
//             "data" : {
//                 "error" :error.message
//             }
//         })
//     }
//  })

//  app.put("/updateusers",async (req,res)=>{
//     const {id, names , emails ,batchs ,ages, is_course_completeds } = req.body
//             if(!mongoose.Types.ObjectId.isValid(id)){
//            return res.status(400).json({
//                 "statuscode":400,
//                 "success":false,
//                 "message": "invaild object type",
//                 "data" : null
//             })
//         }
//    try {
//     const userdata = await userModel.findByIdAndUpdate(id,{
//         name : names,
//         email :emails,
//         batch  : batchs,
//         age : ages,
//         is_course_completed : is_course_completeds
//     },
//     { new: true }
// )
//         if(!userdata){
//             return res.status(404).json({
//                 "statuscode":404,
//                 "success":false,
//                 "message": "invaild user",
//                 "data" : null
//             })
//         }

//          res.json({
//             "statuscode":200,
//             "success":true,
//             "message": "data is feteched",
//             "data" : userdata
//         })
//    } catch (error) {
//    return res.status(500).json({
//         "statuscode":500,
//         "success":false,
//         "message": "Internal Server Error",
//         "data" : {
//             "error" :error.message
//         }
//     })
//    }
//  })
// app.get("/getuser/:id",async (req,res)=>{
//     const {id} =  req.params
//         if(!mongoose.Types.ObjectId.isValid(id)){
//             res.status(400).json({
//                 "statuscode":400,
//                 "success":false,
//                 "message": "invaild object type",
//                 "data" : null
//             })
//         }
//     try {
//         let userdata = await usermodel.findById(id)
//         if(!userdata){
//             res.status(404).json({
//                 "statuscode":404,
//                 "success":false,
//                 "message": "user not found",
//                 "data" : null
//             })
//         }
//         res.json({
//             "statuscode":200,
//             "success":true,
//             "message": "data is feteched",
//             "data" : userdata
//         })
//     } catch (error) {
//         res.status(500).json({
//             "statuscode":500,
//             "success":false,
//             "message": error.message,
//             "data" : null
//         })
//     }

// })

 app.listen(4000)



// Why the Error Happens
// userModel.find() returns a Query object (which is like a promise, but with extra internal properties). Trying to JSON.stringify() it (which res.json() does internally) throws an error because of circular references inside that object.

// You fix it by waiting for the promise to resolve using await.

