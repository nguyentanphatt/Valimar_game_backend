import express from 'express';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';
import requirementRoutes from './routes/requirementRoutes'
import screenshotsRoutes from './routes/screenshotRoutes';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes'
import promocodeRoutes from './routes/promocodeRoutes'

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://valimar-e-commerce-mcbpnk3vd-phats-projects-09db390c.vercel.app',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Or allow all origins (not recommended for production)
app.use(cors());
app.use('/games', gameRoutes);
app.use('/requirements', requirementRoutes);
app.use('/screenshots', screenshotsRoutes);
app.use('/user', userRoutes)
app.use('/cart', cartRoutes)
app.use('/promocode', promocodeRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//npx ts-node app.ts