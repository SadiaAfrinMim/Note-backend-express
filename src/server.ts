
import app from './app';
import mongoose from 'mongoose';
import { Server } from 'http';

let server:Server;
const PORT =5000;


async function main() {
    try{
        await mongoose.connect('mongodb+srv://sadiaafrinmim660:K5tKDnAhA5qDLxz7@express.8ol7mkk.mongodb.net/advance-note-app?retryWrites=true&w=majority&appName=Express')
         console.log("connected to mongodb using mongoose!!")
        server = app.listen(PORT,()=>{
           
            console.log(`app is listening on port ${PORT}`)
        });
    }
    catch(error){
        console.log(error)
    }
    
}
main()