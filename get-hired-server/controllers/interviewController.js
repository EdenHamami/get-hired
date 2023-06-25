const InterviewProblem = require('../models/interviewProblem');
const path = require('path');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'abcde12345eauofn213-e3i9rfnwjfwf';
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fs = require('fs')
const {google} = require('googleapis')

const GOOGLE_API_FOLDER_ID = '1x_W4D837Qf-unLskEHty_4ahyDWlGjBJ'

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    console.log('No token provided')
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(token)
      console.log('Failed to authenticate token')
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded.userId;
    next();
  });
};

async function uploadFile(fileName){
  try{
    const auth = new google.auth.GoogleAuth({
      keyFile: './googlekey.json',
      scopes: ['https://www.googleapis.com/auth/drive']
    })
    const driveService = google.drive({
      version: 'v3',
      auth
    })

    const fileMetaData = {
      'name': fileName,
      'parents': [GOOGLE_API_FOLDER_ID]
    }

    const media= {
      mimeType: 'video/mp4',
      body: fs.createReadStream('./uploads/' + fileName)
    }

    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      field: 'id'
    })
    return response.data.id
  }
  catch(err){
    console.log('Upload file error', err)
  }
}

module.exports = function configureServer(app) {
  // get the question
  let interview;

  app.post('/interview-question/:selectedPosition', async (req, res) => {
    const selectedPosition = req.params.selectedPosition;
    interview = await InterviewProblem.findOne({ type: selectedPosition });
    // console.log(selectedPosition)
    // console.log(interview)
    if (interview) {
      const data = {
        questions: interview.questions,
      };
      res.send(data);
    } else {
      res.status(404).send('No item found with the selected position');
    }
  });

  app.post('/upload-video', upload.single('video'),verifyToken, async (req, res) => {
    const file = req.file;
    console.log(file)
    if (!file) {
      return res.status(400).json({ error: 'No video file provided.' });
    }
  
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName);
    const newFileName = "user-video" + fileExtension;
    const newPath = path.join(file.destination, newFileName);
    
    fs.renameSync(file.path, newPath);
  
    const fileId = await uploadFile(newFileName)
    
    
    try{
      var user = await User.findOne({ _id: req.user[0]._id });
      } catch{
     
        var user = await User.findOne({ _id: req.user._id });
      }
    console.log(user)

       
    fs.unlinkSync(newPath);
    console.log(fileId)
    user.interviewDriveLink = fileId;
    await user.save();
    return res.status(200).json(fileId);
  });

  app.post('/get-video', verifyToken, async (req, res) => {

    try{
      var user = await User.findOne({ _id: req.user[0]._id });
      } catch{
     
        var user = await User.findOne({ _id: req.user._id });
      }       
    // fs.unlinkSync(newPath);
    interviewDriveLink = user.interviewDriveLink;
    return res.status(200).json(interviewDriveLink);
  });
  
};