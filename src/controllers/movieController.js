import { prisma } from "../config/prisma.ts";

const getAllMovies = async (req,res) => {
    const movies = await prisma.movie.findMany();
    console.log("Movies:", movies);

    if(movies.length === 0){
        return res.status(404).json({
            status: "Fail",
            message: "No movies found"
        })
    }
    
    res.status(200).json({
        status: "Success",
        data: {
            movies
        }
    })
}

const getMovieById = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await prisma.movie.findUnique({
            where: { id },
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.status(200).json({
            status: "Success",
            data: {
                ...movie
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve movie" });
    }
}

// controllers/movieController.ts

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;

    // Optional: Check if movie exists first
    const existingMovie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!existingMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Update the movie
    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(overview && { overview }),
        ...(releaseYear && { releaseYear }),
        ...(genres && { genres }),
        ...(runtime && { runtime }),
        ...(posterUrl && { posterUrl }),
      },
    });

    res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update movie" });
  }
};

export { getAllMovies, getMovieById };