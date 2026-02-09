import express from 'express';
import { addToWatchlist, getAllWatchlist, getWatchListById } from '../controllers/watchListController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Sample movie data
router.post("/addToWatchlist",authMiddleware, addToWatchlist)
router.get("/getAllWatchlist", authMiddleware, getAllWatchlist)
router.get("/getWatchListItem/:id", authMiddleware, getWatchListById)


export default router;