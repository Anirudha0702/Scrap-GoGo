import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Search from './controllers/Search';
import Episode from './controllers/Episode';
import Info from './controllers/Info';
import { get } from 'http';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/anime/search", Search);
app.get("/anime/info/:id", Info);
app.get("/anime/episode/:ep_id", Episode);
app.get('/', async (req: Request, res: Response) => {
  res.json({ 
    Search: '/anime/search/[keyword]',
    Info: '/anime/info/[id]',
    Episode: '/anime/episode/[ep_id]'
 });
  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
