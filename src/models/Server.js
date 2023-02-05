/* eslint-disable global-require */
const path = require('path');
const cors = require('cors');
const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use('/products', require('../routes/products.routes'));
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
    // Directorio público
    this.app.use(express.static(path.join(__dirname, './../public')));
  }

  listen() {
    this.app.listen(this.port, (err) => {
      if (err) console.log(err.message);
      console.log(`server up and running at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
