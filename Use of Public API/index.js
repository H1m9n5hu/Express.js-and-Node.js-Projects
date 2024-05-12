import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "Use your own API key here!";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let cityName = "";
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let time = `${hours}:${minutes}`;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + `?q=${cityName}&appid=${apiKey}`);
    response.data['time'] = time;
    response.data['flag'] = true;
    console.log(response.data);
    res.render('index.ejs', { content: response.data});
  } catch (err) {
    err['flag'] = false;
    console.log(err);
    console.error("Failed to make request", err.message);
    res.render('index.ejs', { content: err.message });
  }
});

app.post("/", (req, res) => {
  cityName = req.body.cityName;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
