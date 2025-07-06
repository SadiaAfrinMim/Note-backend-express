import { model, Schema } from "mongoose";
import { Iuser } from "../interfaces/user.interface";

const userSchema = new Schema<Iuser>({
    firstName:{
        type:String,
        required:true,
        trim: true,
        minlength:[5, "first name must be atleast 3 characters got {VALUE}"],
        maxlength: 10
    },
     lastName:{
        type:String,
        required:true,
        trim: true
    },
 
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique: true
    },
       age:{
        type:Number,
        required:true,
        min:18,
        max: 60,

    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }

})


export const User = model("User",userSchema)