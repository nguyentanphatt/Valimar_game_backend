import express from 'express';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';
import requirementRoutes from './routes/requirementRoutes'
import screenshotsRoutes from './routes/screenshotRoutes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/games', gameRoutes);
app.use('/requirements', requirementRoutes);
app.use('/screenshots', screenshotsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//npx ts-node app.ts