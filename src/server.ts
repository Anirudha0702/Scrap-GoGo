import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Search from './controllers/Search';
import Info from './controllers/Info';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/anime/search", Search);
app.get("/anime/info/:id", Info);
app.get('/', async (req: Request, res: Response) => {
  res.json({ 
    Search: '/anime/search/[keyword]',
    Info: '/anime/info/[id]',
 });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
