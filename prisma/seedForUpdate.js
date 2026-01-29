import { prisma } from "../src/config/prisma.ts";

const userId = "9de21f76-4f72-49f5-b957-4e9c351d95ad";

// These poster URLs are from IMDb/Amazon Media CDN
// Pattern: https://m.media-amazon.com/images/M/[UNIQUE_ID]._V1_.jpg
const movieUpdates = [
  {
    title: "The Matrix",
    posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_OvYBI2dc3UMzslgwcsxAc3g51GgODK-FRw&s",
  },
  {
    title: "Inception",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
  },
  {
    title: "The Dark Knight",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
  },
  {
    title: "Pulp Fiction",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  },
  {
    title: "Interstellar",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
  },
  {
    title: "The Shawshank Redemption",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
  },
  {
    title: "Fight Club",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  },
  {
    title: "Forrest Gump",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
  },
  {
    title: "The Godfather",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  },
  {
    title: "Goodfellas",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYjllYzEzZDUtMmUxMi00MjEwLWFiYTQtNTg5OWY1MTlhYjI0XkEyXkFqcGdeQW1pYnJ5YW50._V1_.jpg",
  },
];

const main = async () => {
  console.log("Updating movie poster URLs...");

  for (const update of movieUpdates) {
    try {
      const result = await prisma.movie.updateMany({
        where: {
          title: update.title,
          createdBy: userId,
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