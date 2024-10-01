import { request } from 'express';
import app from '../server.js';
import mongoose from 'mongoose';
import userModel from '../src/models/User.js'; // Import the user model
import {
  beforeAll,
  afterAll,
  describe,
  it,
  expect,
  afterEach,
  beforeEach,
} from '@jest/globals';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Cleanup function to remove test users
const cleanupTestUser = async () => {
  await userModel.deleteMany({ email: 'test@example.com' });
};

describe('Auth Routes', () => {
  beforeEach(async () => {
    // Ensure that the user does not exist before each test
    await cleanupTestUser();
  });

  afterEach(async () => {
    // Clean up after each test
    await cleanupTestUser();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe(
      'User registered successfully. Please check your email to verify your account.'
    );

    // Verify the user was created in the database
    const user = await userModel.findOne({ email: 'test@example.com' });
    expect(user).toBeTruthy(); // User should exist
    expect(user.name).toBe('Test User');
  });

  it('should not login unverified user', async () => {
    // First register the user to create an account
    await userModel.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      isVerified: false, // Set isVerified to false to simulate unverified user
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Please verify your email to log in');
  });
});
