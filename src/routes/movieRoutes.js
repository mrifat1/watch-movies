import express from 'express';
import { prisma } from '../config/prisma.ts';
import { getAllMovies, getMovieById } from '../controllers/movieController.js';

const router = express.Router();

// Sample movie data
router.get("/getAllMovies", getAllMovies)
router.get("/getMovie/:id", getMovieById)


export default router;