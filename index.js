const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const PORT = 3000;
const app = express();
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'dipto.html')));
const videoFilePath = 'video.json';
const photoFilePath = 'photo.json';
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function getDataFromFile(filePath) {
  try {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
  } catch (err) {
    console.error(`Error reading ${filePath} file:`, err);
  }
}
function isAlreadyAdded(data, url) {
  return data.includes(url);
}
app.get('/data', async (req, res) => {
  const type = req.query.type;
  const addVideo = req.query.addVideo;
  const addPhoto = req.query.addPhoto;
  let filePath = '';
  if (addVideo) {
    console.log(addVideo);
    filePath = videoFilePath;
    const videoData = await getDataFromFile(filePath);

    if (!isAlreadyAdded(videoData, addVideo)) {
      videoData.push(addVideo);
      fs.writeFileSync(filePath, JSON.stringify(videoData, null, 2));
      return res.json({data:"Video added successfully",data2: `Total videos added: ${videoData.length}`, author: "Dipto",});
    } else {
      return res.json({data:'Video already exists',data2:"null", author: "Dipto",});
    }
  } else if (addPhoto) {
    console.log(addPhoto);
    filePath = photoFilePath;
    const photoData = await getDataFromFile(filePath);
    if (!isAlreadyAdded(photoData, addPhoto)) {
      photoData.push(addPhoto);
      fs.writeFileSync(filePath, JSON.stringify(photoData, null, 2));
      return res.json({data:'Photo added successfully.',data2:`Total photos added: ${photoData.length}`, author: "Dipto",});
    } else {
      return res.json({data: 'Photo already exists',data2:"null",author: "Dipto",});
    }
  } else if (type === 'video') {
    console.log(type);
    filePath = videoFilePath;
  } else if (type === 'photo') {
    console.log(type);
    filePath = photoFilePath;
  }
  try {
    const data = getDataFromFile(filePath);
    const randomData = getRandomItem(data);

    res.json({
      data: randomData,
      type,
      author: "Dipto",
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
