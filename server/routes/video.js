const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const path = require('path')
var ffmpeg = require("fluent-ffmpeg")



let storage = multer.diskStorage({
    //req한 file을 어디에 저장할 것인가
    destination: (req, file, cb) => {   
        cb(null, "uploads/")
    },
    //req한 file을 이름을 지정
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    //req한 file의 종류를 제한
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        console.log(file.originalname)
        if(ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false)
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");
//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/thumbnail', (req, res) => {
    
    let filePath = ""
    let fileDuration = ""
    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, (err, metadata) => {
        console.dir(metadata)
        console.log(metadata.format.duration)
        fileDuration = metadata.format.duration
    })
    
    // 썸네일 생성 
    ffmpeg(req.body.url)
    //파일 이름 생성
    .on('filenames', (filenames) => {
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames)

        filePath = "uploads/thumbnails/" + filenames[0]
    })
    //파일 생성 후 할 일
    .on('end', () => {
        console.log('Screenshots taken')
        return res.json({ success: true, url: filePath, fileDuration: fileDuration})
    })
    .on('error', (err) => {
        console.log(err)
        return res.json({ success: false, err })
    })
    //옵션 
    .screenshots({
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        //확장자를 제외한 이름
        filename: 'thumbanil_%b.png'
    })    
})

module.exports = router;
