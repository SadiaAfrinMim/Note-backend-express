import { model, Schema } from "mongoose";
import { Iuser } from "../interfaces/user.interface";
import validator from 'validator';



const userSchema = new Schema<Iuser>({
    firstName:{
        type:String,
        required:[true,"fristName kno daw nai?"],
        trim: true,
        minlength:[5, "first name must be atleast 3 characters got {VALUE}"],
        maxlength: 10
    },
     lastName:{
        type:String,
        required:true,
        trim: true,
        minlength:[3,"name must be 2 character"],
        maxlength:10
    },
 
    email:{
        type:String,
        required:[true,"email common hoye gesche"],
        trim:true,
        lowercase:true,
        unique: true,
        // validate:{
        //     validator: function(value){
        //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        //     },
        //     message:function(props){
        //         return `Email ${props.value} is not valid email`
        //     }
        // }
        validate:[validator.isEmail,"invalid Email {VALUE}"]
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
        uppercase: true,
        enum:{
            values:['USER','ADMIN','SUPERADMIN'],
            message:"Role is not valid go {VALUE} role"
        },
        default:'USER'
    }

})


export const User = model("User",userSchema)