import express from `express`;
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.route.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);


app.listen(PORT, () => {
    console.log(`Server online, using PORT:${PORT}`);
});