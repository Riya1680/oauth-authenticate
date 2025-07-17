import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    email:{
       type: String,
       unique: true,
    },
    avatar:{
        type:String
    },
    provider:{
       type:String,
    },
    
})

export default mongoose.model("User", userSchema)