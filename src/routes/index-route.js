const {Router} =require('express');
const Image = require('../models/image');

const router = Router();

router.get('/', async (req, res) =>{
    const images = await Image.find();
    console.log(images);
    res.render('index', {images});
});

router.get('/upload', (req, res, next)=>{
    res.render('upload');
});


router.post('/upload', async(req, res, next)=>{
    const image = new Image();
    image.title =req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size= req.file.size;
    image.path ='/img/uploads/' + req.file.filename;
    console.log(image);
    await image.save();
    res.redirect('/');

});


router.get('/image/:id', (req, res, next)=>{
    const {id} = req.params;
    console.log(id);
    res.send('profile image');
});


router.get('/image/:id/delete', (req, res, next)=>{
    res.send('image delete');
});

module.exports = router;