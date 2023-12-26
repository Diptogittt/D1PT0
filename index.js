const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const PORT = process.env.PORT || 3000 || 5000 || 8000 || 6969;
const app = express();
app.get('/doc', (req, res) => res.sendFile(path.join(__dirname, 'dipto.html')));
const videoFilePath = 'video.json';
const photoFilePath = 'photo.json';
const lofiFilePath = 'lofi.json';
const sadFilePath = 'sad.json';
const funnyFilePath = 'funny.json';
const islamicFilePath = 'islamic.json';
const hornyFilePath = 'horny.json';
function getRandomItem(array) {
  if (array && array.length > 0) {
    return array[Math.floor(Math.random() * array.length)];
  } else {
    return null;
  }
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
  const addSad = req.query.addSad;
  const addLofi = req.query.addLofi;
  const addFunny = req.query.addFunny;
  const addIslamic = req.query.addIslamic;
  const addHorny = req.query.addHorny;
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
  }
  else if (addLofi) {
    console.log(addLofi);
    filePath = lofiFilePath;
    const lofiData = await getDataFromFile(filePath);
    if (!isAlreadyAdded(lofiData, addLofi)) {
      lofiData.push(addLofi);
      fs.writeFileSync(filePath, JSON.stringify(lofiData, null, 2));
      return res.json({data:'Lofi Video added successfully.',data2:`Total Lofi video added: ${lofiData.length}`, author: "Dipto",});
    } else {
      return res.json({data: 'This Lofi video is already exists',data2:"null",author: "Dipto",});
    }
  }
  else if (addSad) {
    console.log(addSad);
    filePath = sadFilePath;
    const sadData = await getDataFromFile(filePath);
    if (!isAlreadyAdded(sadData, addSad)) {
      sadData.push(addSad);
      fs.writeFileSync(filePath, JSON.stringify(sadData, null, 2));
      return res.json({data:'Sad video added successfully.',data2:`Total Sad video added: ${sadData.length}`, author: "Dipto",});
    } else {
      return res.json({data: 'Sad video already exists',data2:"null",author: "Dipto",});
    }
  }
  
  else if (addFunny) {
    console.log(addFunny);
    filePath = funnyFilePath;
    const funnyData = await getDataFromFile(filePath);
    if (!isAlreadyAdded(funnyData, addFunny)) {
      funnyData.push(addFunny);
      fs.writeFileSync(filePath, JSON.stringify(funnyData, null, 2));
      return res.json({data:'Funny  Video added successfully.',data2:`Total Funny video added: ${funnyData.length}`, author: "Dipto",});
    } else {
      return res.json({data: 'This Funny video is already exists',data2:"null",author: "Dipto",});
    }
  }
  else if (addIslamic) {
    console.log(addIslamic);
    filePath = islamicFilePath;
    const islamicData = await getDataFromFile(filePath);
    if (!isAlreadyAdded(islamicData, addIslamic)) {
      islamicData.push(addIslamic);
      fs.writeFileSync(filePath, JSON.stringify(islamicData, null, 2));
      return res.json({data:'Islamic video added successfully.',data2:`Total Islamic video added: ${islamicData.length}`, author: "Dipto",});
    } else {
      return res.json({data: 'Islamic video already exists',data2:"null",author: "Dipto",});
    }
  }
  else if (addHorny) {
    console.log(addHorny);
    filePath = hornyFilePath;
    const hornyData = await getDataFromFile(filePath);
    if (!isAlreadyAdded(hornyData, addHorny)) {
      hornyData.push(addHorny);
      fs.writeFileSync(filePath, JSON.stringify(hornyData, null, 2));
      return res.json({data:'Horny Video added successfully.',data2:`Total Horny video added: ${hornyData.length}`, author: "Dipto",});
    } else {
      return res.json({data: 'This Horny video is already exists',data2:"null",author: "Dipto",});
    }
  }
  else if (type === 'video') {
    console.log(type);
    filePath = videoFilePath;
  } else if (type === 'photo') {
    console.log(type);
    filePath = photoFilePath;
  }else if (type === 'sad') {
    console.log(type);
    filePath = sadFilePath;
  } else if (type === 'lofi') {
    console.log(type);
    filePath = lofiFilePath;
  }else if (type === 'funny') {
    console.log(type);
    filePath = funnyFilePath;
  } else if (type === 'islamic') {
    console.log(type);
    filePath = islamicFilePath;
  }
  else if (type === 'horny') {
    console.log(type);
    filePath = hornyFilePath;
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
    res.status(500).send('Internal Server Error', err);
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
