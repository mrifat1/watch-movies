import express from 'express';
import { addToWatchlist, getAllWatchlist } from '../controllers/watchListController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Sample movie data
router.post("/addToWatchlist",authMiddleware, addToWatchlist)
router.get("/getAllWatchlist",authMiddleware, getAllWatchlist)


export default router;