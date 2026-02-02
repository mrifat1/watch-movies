import express from 'express';
import { prisma } from '../config/prisma.ts';
import { createMovie, getAllMovies, getMovieById } from '../controllers/movieController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Sample movie data
router.get("/getAllMovies", getAllMovies)
router.get("/getMovie/:id", getMovieById)
router.post("/createMovie", authMiddleware, createMovie)


export default router;