import express, { Application, Request, Response } from 'express';
import sharpResize from './sharpResize';
import * as dotenv from 'dotenv';
import 'dotenv/config'

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.json({ msg: `Hello from the server` });
});

app.get("/image", async (req: Request, res: Response): Promise<any> => {
  const { name, width, height } = req.query as {
    name: string;
    width: string;
    height: string;
  };
  if (!name || !width || !height || +width <= 0 || +height <= 0)
    return res.status(400).json({ msg: "wrong input" });
  const { data, error } = await sharpResize(name, width, height);
  if (error.message) return res.status(400).json({ msg: error.message });
  res.sendFile(data);
});

app.listen(port, () => {
  console.log(`server is online at http://localhost:${port}`);
});

export default app;
