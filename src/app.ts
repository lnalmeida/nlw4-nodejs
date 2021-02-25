import 'reflect-metadata';
import createConnection from './database';
import express from 'express';
import { router } from './routes'

const port = process.env.PORT || 3333;

createConnection();

const app = express();
app.use(express.json());

app.use(router);

export { app, port };