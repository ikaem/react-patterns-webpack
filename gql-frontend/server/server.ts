import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';

// some middleware here
import { isConnected } from './lib/user';

import config from './config';
import { Request, Response } from 'express-serve-static-core';
import { NextFunction } from 'connect';

const port = process.env.NODE_PORT || 3000;
// const DIST_DIR = path.join(__dirname, '../dist');
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const app = express();
// with this, we just serve the actual html file
app.use(express.static(DIST_DIR));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: config.security.secretKey,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.security.secretKey));
app.use(cors({ credentials: true, origin: true }));

app.get(
  '/dashboard',
  isConnected(true, ['god', 'admin'], '/login?redirectTo=/dashboard'),
  (req: Request, res: Response, next: NextFunction) => next()
);

// app.get('/dashboard', (req: Request, res: Response, next: NextFunction) => {
//   console.log(req);
//   next();
// });

app.get('/login', isConnected(false), (req, res, next: NextFunction) => {
  next();
});

app.get('/logout', (req, res) => {
  // this should probably be called token
  res.clearCookie('token');
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

const start = async () => {
  app.listen(port, () => console.log(`Running on http://localhost:${port}`));
};

start();
