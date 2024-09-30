import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import passport from './src/config/passport.js';
import session from 'express-session';
import authRoutes from './src/routes/authRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import errorHandler from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();

// Connect to database
connectDB();

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
app.use('/api/auth', authRoutes);
// app.use('/api/upload', uploadRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
