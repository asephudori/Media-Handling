require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.use('/images', express.static('public/images'));
app.use('/videos', express.static('public/videos'));
app.use('/documents', express.static('public/documents'));

app.get('/', (req, res) => {
    return res.json({
        status: true,
        message: 'hello world',
        
    })
})

const mediaRouter = require('./routes/media.routes.js');
app.use('/api/v1', mediaRouter);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log('listening on port', PORT));