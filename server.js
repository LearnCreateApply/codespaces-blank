// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// // __dirname doesn't work in ES Modules, so we use fileURLToPath to get the directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // Serve static assets from the 'public' directory (or wherever your assets are)
// app.use(express.static(path.join(__dirname, 'public')));

// // Serve the 'index.html' file at the root route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/index.html')); // Adjust the path accordingly
// });

// // Start the server on port 3000
// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });
