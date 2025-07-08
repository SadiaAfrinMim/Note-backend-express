
import express, {  Request, Response } from 'express';
import { User } from '../model/user.model';
import z from 'zod';


export const userRoutes = express.Router()

const createUserZodSchema = z.object({
    firstName: z.string(),
    lastName:z.string(),
    age:z.number(),
    email:z.string(),
    password: z.string(),
    role:z.string().optional()

})

userRoutes.post('/create-user',async(req:Request,res:Response)=>{

    try{
        // const zodbody = await createUserZodSchema.parseAsync(req.body);
        const body = req.body;
        const user = await User.create(body)
        console.log(body,"zod body")
         res.status(201).json({
        success:true,
        message:"Note created successfully",
         user:user
    })
   
    }
    catch(error:any){
        console.log(error)
          res.status(400).json({
        success:false,
        message:error.message,
        error
    })
   
   
}

})

userRoutes.get('/',async(req:Request,res:Response)=>{
    const user = await User.find()
    res.status(201).json({
        success:true,
        message:"all note",
         user
    })
   
})

userRoutes.get("/:userId",async(req:Request,res:Response)=>{
    const userId = req.params.userId;
    const user = await User.findOne({_id:userId})
    res.status(201).json({
        message:"showing a single id",
        user
    })
    
})


userRoutes.delete("/:userId",async(req:Request,res:Response)=>{
    const userId =req.params.userId 
    const user = await User.deleteOne({_id:userId})
    res.status(201).json({
        success:true,
        message:"the user is deleted",
        user

    })
    
})

userRoutes.patch('/:userId',async(req:Request,res:Response)=>{
    const body = req.body;
    const userId = req.params.body 
    const user = await User.findByIdAndUpdate(userId,body,{new:true})
    res.status(201).json({
        message:"user updated",
        user
    })
   
})