import express,{ Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { Note } from "./app/model/notes.model";
import { noteRoutes } from "./app/controllers/notes.controller";
import { userRoutes } from "./app/controllers/user.controller";

const app:Application = express()
app.use(express.json())

app.use("/notes",noteRoutes)
app.use("/users",userRoutes)

app.get('/',(req:Request,res:Response)=>{
    res.send('welcome to Note App')
})

export default app;
