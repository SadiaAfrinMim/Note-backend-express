import express, { Request, Response } from "express"
import { Note } from "../model/notes.model"

export const noteRoutes = express.Router()

noteRoutes.post('/create-note',async(req:Request,res:Response)=>{
    const body = req.body
    const note = await Note.create(body)
    // const myNote = new Note ({
    //     title:"learning mongoose",
    //     content:"I am learning mongoose",
    //     tages:{
    //         label:"database"
    //     }
      
    // })


    // await myNote.save()
    res.status(201).json({
        success:true,
        message:"Note created successfully",
        note
    })
})

noteRoutes.get('/',async(req:Request,res:Response)=>{
   
    const notes = await Note.find()
    
    res.status(201).json({
        success:true,
        message:"Note created successfully",
        notes
    })
})

noteRoutes.get('/:noteId',async(req:Request,res:Response)=>{
    const noteId = req.params.noteId;

   
    const note = await Note.findOne({_id:noteId})
    
    res.status(201).json({
        success:true,
        message:"Note created successfully",
        note
    })
})


noteRoutes.patch('/:noteId',async(req:Request,res:Response)=>{
    const noteId = req.params.noteId;
    const body = req.body
    // const note = await Note.findByIdAndUpdate(noteId,body,{new:true})
    // const note = await Note.findOneAndUpdate({_id:noteId},body,{new:true})
    const note = await Note.updateOne({_id:noteId},body,{new:true})


   
  
    
    res.status(201).json({
        success:true,
        message:"Note created successfully",
        note
    })
})

noteRoutes.delete('/:noteId',async(req:Request,res:Response)=>{
    const noteId = req.params.noteId;
   
    // const note = await Note.findByIdAndUpdate(noteId,body,{new:true})
    // const note = await Note.findOneAndUpdate({_id:noteId},body,{new:true})
    const note = await Note.deleteOne({_id:noteId})


   
  
    
    res.status(201).json({
        success:true,
        message:"Note created successfully",
        note
    })
})