import path from 'path';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import createConfig from './utils/createConfig';
import homeRoute from './routes/homeRoute';

let allowedOrigins = [
  'bjnunez.com',
  'trackit.digital',
];

const localOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:8080',
];

const app = express();

async function application(config) {
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(cors({
    origin(origin, callback) {
      if (config.get('allowLocalOrigins')) {
        allowedOrigins = [...allowedOrigins, ...localOrigins];
      }

      if (!origin) return callback(null, true);

      const hasOrigin = allowedOrigins.find((allowedOrigin) => origin.includes(allowedOrigin));
      if (!hasOrigin) {
        return callback(
          new Error('CORS: Origin not allowed'),
          false
        );
      }

      return callback(null, true);
    },
    exposedHeaders: ['Content-Type'],
  }));
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.set('config', config);
  app.use('/', homeRoute());
}

async function bootstrappedApp() {
  const config = await createConfig();
  await application(config);
  return app;
}

export default bootstrappedApp;
