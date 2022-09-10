const express = require("express");
const app = express();
const morgan = require("morgan");
const postBank = require("./movieBank.js");
const path = require("path");
const movieBank = require("./movieBank.js");

app.use(morgan("dev"));
const static = express.static(path.join(__dirname, "public"));
app.use(static);

//sends back the string "Server is online!"
app.get("/health", (req, res, next) => {
	res.send("Server is online!");
});

//sends back the entire array of movie
app.get("/movies", (req, res, next) => {
	const movies = movieBank.list();
	const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>TOP 5 MOVIE</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="movies-list">
      <header><img src="/logo.png"/>TOP FIVE MOVIES</header>
      ${movies.map((movie) => `
        <div class='movies-item'>
          <p>
            <span class="movies-position">${movie.id}. 🎬</span>${movie.title}
            <small>(⭐rate: ${movie.rate})</small>
          </p>
          <small class="movies-info">
            ${movie.description}
          </small>
        </div>`).join("")}
    </div>
  </body>
</html>`;

	res.send(html);
});


//sends back single item
app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = movieBank.find(id);
  if (!movie.id) {
    // If the post wasn't found, just throw an error
    throw new Error('Not Found');
  }
  else {
    const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>TOP 5 MOVIE</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="movies-list">
        <header><img src="/logo.png"/>TOP FIVE MOVIES</header>
          <div class='movies-item'>
            <p>
              <span class="movies-position">${movie.id}. 🎬</span>${movie.title}
              <small>(⭐rate: ${movie.rate})</small>
            </p>
            <small class="movies-info">
              ${movie.description}
            </small>
          </div>
      </div>
    </body>
  </html>`;

	res.send(html);
  }
});

//error handler
app.use((err, req, res, next) => {
	const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>TOP FIVE MOVIE</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/404.jpeg">TOP FIVE MOVIES</header>
      <div class="not-found">
        <img src="/404.jpeg"/>
      </div>
    </body>
    </html>
    `;
	console.log(err.stack);
	res.status(404).send(html);
});
const PORT = 5000;

app.listen(PORT, () => {
	console.log(`App listening in port ${PORT}`);
});
