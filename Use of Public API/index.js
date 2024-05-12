import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.render('index.ejs', { Name: "Himanshu" });
});

app.listen(port, () => {
    console.log('listening on port: ' + port);
})