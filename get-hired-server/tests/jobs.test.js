// jobsController.test.js

const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const jobsController = require('../controllers/jobController');
const valid_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOlt7Il9pZCI6IjY0N2M5MzkxMjk4YWYzNjMyZDE1NjNhMyIsInVzZXJuYW1lIjoiQXZpMTIzNDUiLCJwYXNzd29yZCI6IkF2aTEyMzQ1IiwicGVyc29uYWxJbmZvIjpbXSwid29ya0V4cGVyaWVuY2UiOltdLCJlZHVjYXRpb24iOltdLCJteVByYWN0aWNlUHJvYmxlbXMiOltdLCJpbnRlcmVzdGVkVmFjYW5jaWVzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMy0wNi0wNFQxMzozNzoyMS4xMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0wNFQxMzozNzoyMS4xMDBaIiwiX192IjowfV0sImlhdCI6MTY4NTg4NTg0OX0.EO-fanfVh48JlTZsAQ21DmNolQnGuOejXXjNyUSF3dg"
const valid_job = {title: 'Software Developer', company_name: 'Tel Aviv Stock Exchange', location: '  Tel Aviv-Yafo, Israel   ', via: 'via LinkedIn', description: 'Software Developer for Derivatives B.O Application…Full-time\n\nJob Functions – Information Technology'}
const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Apply the jobs routes to the app
jobsController(app);

// Tests...

describe('POST /jobSearch', () => {
    test('it should require authorization', async () => {
        const res = await request(app)
            .post('/jobSearch')
            .send({ jobdescription: 'Engineer', joblocation: 'New York' });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message', 'No token provided');
    });
    test('it should return results for valid input', async () => {
        const res = await request(app)
          .post('/jobSearch')
          .set('Authorization', valid_token)
          .send({ jobdescription: 'Engineer', joblocation: 'New York' });
    
        expect(res.statusCode).toEqual(200);
      });
});

describe('POST /saveJob', () => {
    test('it should require authorization', async () => {
      const res = await request(app)
        .post('/saveJob')
        .send({/* job data... */ });
  
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'No token provided');
    });
  
    test('it should save job for valid input', async () => {
    //   const res = await request(app)
    //     .post('/saveJob')
    //     .set('Authorization', valid_token)
    //     .send( valid_job );
  
    //   expect(res.statusCode).toEqual(200);
    //   expect(res.body).toHaveProperty('message', 'Job saved successfully');
    });
  });