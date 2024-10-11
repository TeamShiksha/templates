import express from 'express';
import cors from 'cors';
import testRoutes from './routes/testRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: `http://localhost:${process.env.UI_PORT}` // Replace with the port your React app runs on
}));

app.use(express.json());

app.use('/test', testRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
