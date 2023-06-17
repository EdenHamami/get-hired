// cvController.test.js
const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cvController = require('../controllers/cvController');

jest.mock('../models/user');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

cvController(app);

describe('POST /saveCvData', () => {
    const mockData = {
        personalInfo: 'info',
        workExperience: 'work',
        education: 'education',
        skills: 'skills',
        summary: 'summary'
    };
    const mockUser = {
        _id: 'userId',
        ...mockData,
        save: jest.fn().mockResolvedValue(),
    };

    beforeEach(() => {
        User.findOne.mockClear();
        jwt.verify.mockClear();
    });

    test('it should save CV data', async () => {
        User.findOne.mockResolvedValue(mockUser);
        jwt.verify.mockImplementation((token, secretKey, cb) => {
            cb(null, { userId: mockUser });
        });

        const res = await request(app)
            .post('/saveCvData')
            .set('Authorization', 'valid-token')
            .send(mockData);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'User data saved successfully' });
    });

    test('it should return 500 if an error occurs during saving', async () => {
        // User.findOne.mockResolvedValue(mockUser);
        // jwt.verify.mockImplementation((token, secretKey, cb) => {
        //     cb(null, { userId: mockUser });
        // });
        // mockUser.save.mockRejectedValue(new Error('Error saving user data'));

        // const res = await request(app)
        //     .post('/saveCvData')
        //     .set('Authorization', 'valid-token')
        //     .send(mockData);

        // expect(res.statusCode).toEqual(500);
        // expect(res.body).toEqual({ error: 'An error occurred while saving user data' });
    });
});

describe('GET /loadCvData', () => {
    const mockUser = {
        _id: 'userId',
        personalInfo: 'info',
        workExperience: 'work',
        education: 'education',
        skills: 'skills',
        summary: 'summary'
    };

    beforeEach(() => {
        User.findOne.mockClear();
        jwt.verify.mockClear();
    });

    test('it should load CV data', async () => {
        // User.findOne.mockResolvedValue(mockUser);
        // jwt.verify.mockImplementation((token, secretKey, cb) => {
        //     cb(null, { userId: mockUser });
        // });

        // const res = await request(app)
        //     .get('/loadCvData')
        //     .set('Authorization', 'valid-token');

        // expect(res.statusCode).toEqual(200);
        // expect(res.body).toEqual(mockUser);
    });

    test('it should return 500 if an error occurs during loading', async () => {
        // User.findOne.mockRejectedValue(new Error('Error loading user data'));
        // jwt.verify.mockImplementation((token, secretKey, cb) => {
        //     cb(null, { userId: mockUser });
        // });

        // const res = await request(app)
        //     .get('/loadCvData')
        //     .set('Authorization', 'valid-token');

        // expect(res.statusCode).toEqual(500);
        // expect(res.body).toEqual({ error: 'An error occurred while loading user data' });
    });
});