import express from 'express';

import {Book}from '../models/bookModel.js';
const router=express.Router()

router.post('/',async(req,res)=>{
    try{
        if(!req.body.title||
            !req.body.author||
            !req.body.publishYear){
                return req.status(400).send({
                    message:'Send all the require field'
                });
            }
            const newBook={title:req.body.title,
            author:req.body.author,
        publishYear:parseInt(req.body.publishYear)}; 
        const book=await Book.create(newBook);
        return res.status(200).send(book);

    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});

    }

})

// getting book
router.get('/',async(req,res)=>{
    try{
        const books=await Book.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        }); 

    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

// Getting books by id
router.get('/:id',async(req,res)=>{
    try{

        const { id }=req.params;
        const book=await Book.findById(id);      
       
        return res.status(200).json(book); 

    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})


//update a book via id
router.put('/:id',async(req,res)=>{
    try{if(!req.body.title||
            !req.body.author||
            !req.body.publishYear){
                return res.status(400).send({
                    message:'Send all the require field'
                });
            }
            const { id }=req.params;
            const result=await Book.findByIdAndUpdate(id,req.body);
            if(!result){
                return res.status(404).json({message:'Book not found'});
            }
            return res.status(200).send({message:'Book Updated Sucessfully'})

    } catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})


//deleting book from the site
router.delete('/book/:id',async(req,res)=>{
    try{

        const{id}=req.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:'Book not found'});
        }
        return res.status(200).send({message:'Book Deleted Sucessfully'});

    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});

    }
})
export default router;