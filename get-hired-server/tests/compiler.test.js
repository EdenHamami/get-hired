// compilerController.test.js

const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const compilerController = require('../controllers/compilerController');
const valid_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOlt7Il9pZCI6IjY0N2M5MzkxMjk4YWYzNjMyZDE1NjNhMyIsInVzZXJuYW1lIjoiQXZpMTIzNDUiLCJwYXNzd29yZCI6IkF2aTEyMzQ1IiwicGVyc29uYWxJbmZvIjpbXSwid29ya0V4cGVyaWVuY2UiOltdLCJlZHVjYXRpb24iOltdLCJteVByYWN0aWNlUHJvYmxlbXMiOltdLCJpbnRlcmVzdGVkVmFjYW5jaWVzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMy0wNi0wNFQxMzozNzoyMS4xMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0wNFQxMzozNzoyMS4xMDBaIiwiX192IjowfV0sImlhdCI6MTY4NTg4NTg0OX0.EO-fanfVh48JlTZsAQ21DmNolQnGuOejXXjNyUSF3dg"
const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Apply the compiler routes to the app
compilerController(app);

// Tests...

jest.mock('../models/practiceProblem', () => ({
  findOne: jest.fn().mockImplementation(async () => ({
    _id: 'sampleId',
    title: 'Sample Title',
    content: 'Sample Content',
    examples: ['example1', 'example2'],
    test: [
      { input: '3', output: '5' },
      { input: '1', output: '3' },
    ],
    python: {
      initial_code: 'sample_initial_code',
      solution: 'sample_solution',
      main: '\nsys.stdout.write(str(add_two(int(sys.argv[1]))))',
      header: 'import sys\n',
    },
    cpp: {
      initial_code: 'sample_initial_code',
      solution: 'sample_solution',
      main: '\nint main(int argc, char** argv) {\nint num = std::atoi(argv[1]);\nint result = addTwo(num);\nstd::cout << result;\nreturn 0;\n}',
      header: ' #include <iostream>\n',
    },
    java: {
      initial_code: 'sample_initial_code',
      solution: 'sample_solution',
      main: '\npublic class Main{\npublic static void main(String[] args) {\nint num = Integer.parseInt(args[0]);\nSolution solution = new Solution();\nint result = solution.addTwo(num);\nSystem.out.print(result);\n}\n}',
      header: 'import java.util.*;\n',
    },
  })),
}));

//correct answer
describe('POST /compile/python/sampleId', () => {
  test('it should require authorization', async () => {
    const res = await request(app)
      .post('/compile/python/sampleId')
      .send({ input: "def add_two(num):\n return num + 2", language: 'python', test_number: 0 });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'No token provided');
  });

  test('it should return results for valid input', async () => {
    const questionRes = await request(app).post('/question/sampleId');

    expect(questionRes.statusCode).toEqual(200);


    const res = await request(app)
      .post('/compile/python/sampleId')
      .set('Authorization', valid_token)
      .send({ input: "def add_two(num):\n return num + 2", language: 'python', test_number: 0 });

      expect(res.statusCode).toEqual(200);
      expect(JSON.parse(res.text).state).toEqual('correct');
      
  });
});

//incorrect answer
describe('POST /compile/cpp/sampleId', () => {
  test('it should require authorization', async () => {
    const res = await request(app)
      .post('/compile/cpp/sampleId')
      .send({ input: "def add_two(num):\n return num + 2", language: 'cpp', test_number: 0 });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'No token provided');
  });

  test('it should return results for valid input', async () => {
    const questionRes = await request(app).post('/question/sampleId');

    expect(questionRes.statusCode).toEqual(200);


    const res = await request(app)
      .post('/compile/cpp/sampleId')
      .set('Authorization', valid_token)
      // +3 incorrent
      .send({ input: "int addTwo(int num) {\nint result = num + 3;\nreturn result;\n} ", language: 'cpp', test_number: 0 });// +3 incorrent

      expect(res.statusCode).toEqual(200);
      expect(JSON.parse(res.text).state).toEqual('incorrect');
      
  });
});

//error answer
describe('POST /compile/java/sampleId', () => {
  test('it should require authorization', async () => {
    const res = await request(app)
      .post('/compile/java/sampleId')
      .send({ input: "def add_two(num):\n return num + 2", language: 'java', test_number: 0 });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'No token provided');
  });

  test('it should return results for valid input', async () => {
    const questionRes = await request(app).post('/question/sampleId');

    expect(questionRes.statusCode).toEqual(200);

    
    const res = await request(app)
      .post('/compile/java/sampleId')
      .set('Authorization', valid_token)
      //missing } at the end of the input
      .send({ input: "class Solution{\npublic static int addTwo(int num) {\nint result = num + 2;\nreturn result;\n}\n", language: 'java', test_number: 0 });// +3 incorrent

      expect(res.statusCode).toEqual(400);
      expect(JSON.parse(res.text).state).toEqual('error');
      
  });
});