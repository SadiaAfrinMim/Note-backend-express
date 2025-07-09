import { model, Schema } from "mongoose";
import { Iuser, UserInstanceMethods, UserStaticMethods } from "../interfaces/user.interface";
import validator from 'validator';
import { IAddress } from './../interfaces/user.interface';
import { Model } from "mongoose";
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>({
      city:{type:String},
        street:{type:String},
        zip:{type:Number}
},{
    _id:false
})



const userSchema = new Schema<Iuser,UserStaticMethods,UserInstanceMethods>({
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
    },
    address:{
        type : addressSchema
      
    }
   
},
 {
        versionKey: false,
        timestamps: true,
        toJSON:{virtuals: true},
        toObject:{virtuals: true}
    }
)


userSchema.method("hashPassword",async function(plainPassword:string){
      const password = await bcrypt.hash(plainPassword,10)
     console.log(password)
     return password
     
})

userSchema.static("hashPassword",async function (plainPassword:string) {
    const password = await bcrypt.hash(plainPassword,10)
    return password
    
})
// pre hook
// document middleware

userSchema.pre("save",async function(){
    console.log("inside pre save hook")
    this.password = await bcrypt.hash(this.password,10)
    console.log(this)
})


userSchema.post("save",async function(doc){
    console.log(`%s Inside post save hook`,doc._id)
})
// query middleware

userSchema.pre("find",function(next){
  console.log("inside pre hook")
    next()
})
// post hook

// query middleware


// user ar sob delet hoye jabe user delet hole note gula delet hobe

userSchema.post("findOneAndDelete",async function(doc,next){
   if(doc){
     console.log(doc)
    await Note.deleteMany({user:doc._id})
   }
   next()
})
userSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`
})

export const User = model<Iuser,UserStaticMethods>("User",userSchema)