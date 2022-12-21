const express = require('express');
const routes = require('./routes');
// import sequelize connection

const connection = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
const init = async () => {
  try {
    await connection.sync({ force: false });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`[ERROR]: Connection to DB has failed | ${error.message}`);
  }
};

init();
