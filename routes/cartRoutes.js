import express from 'express';
import Cart from '../models/cartModel.js'
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from './verifyToken.js';

const router = express.Router();

//CREATE
 
router.post('/', async( req, res)=>{
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(error){
        res.status(500).json(err);
    }
});

//update
router.put('/:id', verifyTokenAndAuthorization,async (req, res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
        );
        res.status(200).json(updatedCart);
    }catch(error){
        res.status(500).json(error);
    }
});

//Delete

router.delete('/:id', async( req, res)=>{
    try{
        await Cart.findOneAndDelete(req.params.id);
        res.status(200).json({message: " Cart has been deleted"});
    }catch(error){
        res.status(500).json(err);
    }
});

//Get user cart
router.get('/find/:userId', verifyTokenAndAuthorization, async( req, res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json(error);
    }
});
// Get all
router.get('/', verifyTokenAndAdmin, async( req, res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
})
export default router; 