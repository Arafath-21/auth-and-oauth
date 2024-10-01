import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import passport from './src/config/passport.js';
import session from 'express-session';
import authRoutes from './src/routes/authRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome</h1>'); // Use res.send to send HTML content
});

app.use('/api/auth', authRoutes);
// app.use('/api/upload', uploadRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on PORT ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
