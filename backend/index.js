import express, { response } from "express";
import mongoose from "mongoose";
const app=express();
import {Book} from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
import {PORT,mongoDBURL} from "./config.js";
import cors from 'cors'

app.use(express.json());
app.use(cors());
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// );
app.use('/book',booksRoute);

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send("Welcome to mernstack")
})


mongoose.connect(mongoDBURL).then(()=>{
console.log("App connected to database");
app.listen(PORT,()=>{
    console.log(`Listening to port: ${PORT}`);
})


}).catch((error)=>{
console.log(error);
})