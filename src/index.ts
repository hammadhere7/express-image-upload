import express, {NextFunction, Request, Response} from 'express';
import bodyParser from "body-parser";
import imageRoutes from './routes/images';
require('dotenv').config()

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/images', imageRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Image Upload API');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});