import express from 'express';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';
import requirementRoutes from './routes/requirementRoutes'
import screenshotsRoutes from './routes/screenshotRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/games', gameRoutes);
app.use('/requirements', requirementRoutes);
app.use('/screenshots', screenshotsRoutes);
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//npx ts-node app.ts