# Watch Movies 🎬

A modern movie streaming application built with JavaScript and TypeScript, featuring database management with Prisma.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

Watch Movies is a web application that allows users to browse, search, and stream movies. The application provides a seamless user experience for discovering and enjoying your favorite films.

## ✨ Features

- 🔍 Browse and search movies
- 🎥 Movie streaming capabilities
- 💾 Database-backed content management
- 🎨 Modern and responsive user interface
- 🔐 User authentication (if applicable)
- 📱 Mobile-friendly design

## 🛠️ Tech Stack

- **Frontend/Backend**: JavaScript (93.6%)
- **Type Safety**: TypeScript (6.4%)
- **Database ORM**: Prisma
- **Database**: PostgreSQL/MySQL/SQLite (configure as needed)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm or yarn package manager
- Database (PostgreSQL, MySQL, or SQLite)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mrifat1/watch-movies.git
cd watch-movies
```

2. Install dependencies:
```bash
npm install
```

### Configuration

1. Set up your environment variables:
```bash
cp .env.example .env
```

2. Configure your database connection in the `.env` file:
```env
DATABASE_URL="your-database-connection-string"
```

3. Set up Prisma and run migrations:
```bash
npx prisma generate
npx prisma migrate dev
```

4. (Optional) Seed the database:
```bash
npm run seed
```

## 💻 Usage

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or your configured port).

### Production Build

Build the application for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 📁 Project Structure

```
watch-movies/
├── prisma/              # Prisma schema and migrations
├── src/                 # Source code
│   ├── components/      # React/UI components (if applicable)
│   ├── pages/          # Application pages
│   ├── utils/          # Utility functions
│   └── ...
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies and scripts
├── prisma.config.ts    # Prisma configuration
└── README.md           # Project documentation
```

## 🗄️ Database

This project uses Prisma as the ORM for database management. The database schema is defined in `prisma/schema.prisma`.

### Common Prisma Commands

- Generate Prisma Client: `npx prisma generate`
- Run migrations: `npx prisma migrate dev`
- Open Prisma Studio: `npx prisma studio`
- Reset database: `npx prisma migrate reset`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**mrifat1**

- GitHub: [@mrifat1](https://github.com/mrifat1)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped this project grow
- Inspired by modern streaming platforms

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
