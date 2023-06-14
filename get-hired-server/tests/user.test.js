// userController.test.js
const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/userController');

jest.mock('../models/user');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

authController(app);

describe('POST /register', () => {
  test('it should register new user', async () => {
    User.find.mockResolvedValue([]);
    jwt.sign.mockReturnValue('valid-token');

    const res = await request(app)
      .post('/register')
      .send({ username: 'user1', password: 'password1' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ token: 'valid-token' });
  });

  test('it should reject registering an existing user', async () => {
    User.find.mockResolvedValue([{}]);

    const res = await request(app)
      .post('/register')
      .send({ username: 'user1', password: 'password1' });

    expect(res.statusCode).toEqual(403);
  });
});

describe('POST /login', () => {
  test('it should log in an existing user', async () => {
    User.find.mockResolvedValue([{ password: 'password1' }]);
    jwt.sign.mockReturnValue('valid-token');

    const res = await request(app)
      .post('/login')
      .send({ username: 'user1', password: 'password1' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ token: 'valid-token' });
  });

  test('it should reject invalid credentials', async () => {
    User.find.mockResolvedValue([{ password: 'wrong-password' }]);

    const res = await request(app)
      .post('/login')
      .send({ username: 'user1', password: 'password1' });

    expect(res.statusCode).toEqual(401);
  });
});

describe('POST /logout', () => {
  test('it should log out', async () => {
    const res = await request(app).post('/logout');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: 'Logout successful' });
  });
});

describe('POST /user_name', () => {
  test('it should require authorization', async () => {
    const res = await request(app).post('/user_name');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'No token provided');
  });

  test('it should return user_name for valid token', async () => {
    jwt.verify.mockImplementation((token, secretKey, cb) => {
      cb(null, { userId: { username: 'user1' } });
    });

    const res = await request(app)
      .post('/user_name')
      .set('Authorization', 'valid-token');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user_name', 'user1');
  });
});
