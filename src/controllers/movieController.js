import { prisma } from "../config/prisma.ts";

const getAllMovies = async (req,res) => {
  const movies = await prisma.movie.findMany({
    orderBy: {
        title: "asc"
      }
    });
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

export const createMovie = async (req, res) => {
  try {
    const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        message: "Only Admin can create movies"
      });
    }

    const checkDuplicate = await prisma.movie.findUnique({
      where: {
        title_releaseYear: {
          title: title,
          releaseYear: releaseYear
        }
      },
    })

    if(checkDuplicate){
      return res.status(409).json({
        message: "Movie with this title & release year already exists"
      })
    }

    const newMovie = await prisma.movie.create({
      data: {
        title,
        overview,
        releaseYear,
        genres,
        runtime,
        posterUrl,
        createdBy: req.user.id
      }
    })

    return res.status(201).json({
      status: "Success",
      newMovie
    })
  } catch (error) {
    console.log(error);
    if (error.code === 'P2002') {
      return res.status(409).json({
        status: "Failed",
        message: "Movie with this title already exists"
      })
    }
    else {
      return res.status(500).json({
        status: "Failed",
        message: error
      })
    }
  }
}

export { getAllMovies, getMovieById };