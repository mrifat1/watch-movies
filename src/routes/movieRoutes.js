import express from 'express';

const router = express.Router();

// Sample movie data
router.get("/hello", (req, res)=>{
    res.json({message: "Hello from movie routes!"});
})

export default router;