import { prisma } from "../src/config/prisma.ts";

const userId = "cc5c58b9-c06e-4f86-8be3-d0e75b81da7d";

// These poster URLs are from IMDb/Amazon Media CDN
// Pattern: https://m.media-amazon.com/images/M/[UNIQUE_ID]._V1_.jpg
const movieUpdates = [
  {
    title: "Gladiator",
    releaseYear: 2000,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png",
  },
  // {
  //   title: "Inception",
  //   posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
  // },
  // {
  //   title: "The Dark Knight",
  //   posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
  // },
  // {
  //   title: "Pulp Fiction",
  //   posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  // },
  // {
  //   title: "Interstellar",
  //   posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
  // },
  // {
  //   title: "The Shawshank Redemption",
  //   posterUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
  // },
  // {
  //   title: "Fight Club",
  //   posterUrl: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  // },
  // {
  //   title: "Forrest Gump",
  //   posterUrl: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
  // },
  // {
  //   title: "The Godfather",
  //   posterUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  // },
  // {
  //   title: "Goodfellas",
  //   posterUrl: "https://m.media-amazon.com/images/M/MV5BYjllYzEzZDUtMmUxMi00MjEwLWFiYTQtNTg5OWY1MTlhYjI0XkEyXkFqcGdeQW1pYnJ5YW50._V1_.jpg",
  // },
];

const main = async () => {
  console.log("Updating movie poster URLs...");

  for (const update of movieUpdates) {
    try {
      const result = await prisma.movie.update({
        where: {
          title_releaseYear: {
            title: update.title,
            releaseYear: update.releaseYear,
          },
        },
        data: {
          posterUrl: update.posterUrl,
        },
      });
      console.log(`✓ Updated ${result.count} movie(s) for: ${update.title}`);
    } catch (error) {
      console.error(`✗ Failed to update ${update.title}:`, error);
    }
  }

  console.log("\nUpdate completed!");
};

main()
  .catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });