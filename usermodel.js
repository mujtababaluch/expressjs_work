const mongoose= require("mongoose");

mongoose.connect(`mongodb://localhost:27017/crudapi`)
const userschema = mongoose.Schema({
    name : { type: String, required: true },
    email :String,
    batch :String,
    age: Number ,
    is_course_completed : Boolean
})

module.exports =   mongoose.model("user",userschema)