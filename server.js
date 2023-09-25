import express from 'express'
import  colors from 'colors'
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import productRouter from './routes/productRoutes.js'

const app =express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

//routes
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)

//port connection
const port =process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server is connected in ${port}`.magenta.bold.underline);
});