const InterviewProblem = require('../models/interviewProblem');
const path = require('path');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fs = require('fs')
const {google} = require('googleapis')

const GOOGLE_API_FOLDER_ID = '1x_W4D837Qf-unLskEHty_4ahyDWlGjBJ'

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
    console.log(selectedPosition)
    console.log(interview)
    if (interview) {
      const data = {
        questions: interview.questions,
      };
      res.send(data);
    } else {
      res.status(404).send('No item found with the selected position');
    }
  });

  app.post('/upload-video', upload.single('video'), async (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No video file provided.' });
    }
  
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName);
    const newFileName = "user-video" + fileExtension;
    const newPath = path.join(file.destination, newFileName);
  
    fs.renameSync(file.path, newPath);
  
    const fileId = await uploadFile(newFileName)
    fs.unlinkSync(newPath);
    return res.status(200).json(fileId);
  });
  
};