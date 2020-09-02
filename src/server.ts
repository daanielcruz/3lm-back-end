import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import URL from './config/database';

import routes from './routes';

class App {
  public app: Application;
  constructor() {
    this.app = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  async database() {
    try {
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } catch (error) {
      process.exit();
    }
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
