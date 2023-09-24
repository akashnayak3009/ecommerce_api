import express from 'express'
import  colors from 'colors'
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import cors from 'cors'
import userRouter from './routes/userRoutes.js'

const app =express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

//routes
app.use('/api/users', userRouter)


//port connection
const port =process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server is connected in ${port}`.magenta.bold.underline);
});