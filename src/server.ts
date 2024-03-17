import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Search from './controllers/Search';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/anime/search",Search);

app.get('/', async(req: Request, res: Response) => {
    res.json('Welcome to the web scraper');
  });
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });