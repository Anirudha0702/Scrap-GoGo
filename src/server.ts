import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Search from './controllers/Search';
import Episode from './controllers/Episode';
import Info from './controllers/Info';
import rateLimit from './middlewares/rateLimit';
import cors from 'cors';
import path from 'path';
dotenv.config();
const app: express.Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",express.static(path.join(__dirname, '../public')));
const options: cors.CorsOptions = {
  methods: 'GET',
};
app.use(cors());
app.get("/anime/search", rateLimit,Search);
app.get("/anime/info/:id",rateLimit, Info);
app.get("/anime/watch/:ep_id",rateLimit, Episode);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
export default app;