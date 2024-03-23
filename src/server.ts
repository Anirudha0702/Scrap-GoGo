import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Search from './controllers/Search';
import Episode from './controllers/Episode';
import Info from './controllers/Info';
import cors from 'cors';
dotenv.config();
const app: express.Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors<Request>());

app.get("/anime/search", Search);
app.get("/anime/info/:id", Info);
app.get("/anime/watch/:ep_id", Episode);
app.get('/', async (req: Request, res: Response) => {
  res.json({ 
    Search: '/anime/search/[keyword]',
    Info: '/anime/info/[id]',
    Episode: '/anime/watch/[ep_id]'
 });
  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
export default app;