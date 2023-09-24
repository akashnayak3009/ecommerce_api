import express from 'express';

const router = express.Router();

//@Desc: userRouter
//@API ENDPOINT: /api/users
//@host: 5000

router.get('/userTest', (req,res)=>{
    res.send("user test is successful");
});

router.post('/userPostTest',(req,res)=>{
    const username =req.body.username;
    res.send("your Username is:" + username);
});

export default router;