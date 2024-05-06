import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


let blogs = [];
app.get("/", (req, res) => {
  res.render("index.ejs", {blogs: blogs});
});

app.post("/", (req, res) => {
  const { title, content } = req.body;
  const id = blogs.length;
  blogs.push({ id, title, content });
  res.redirect("/");
});

app.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  const blog = blogs.find(blog => blog.id == id);
  if(!blog) {
    res.status(404).send("Blog not found");
  } else {
    res.render("blog", { blog: blog });
  }
});

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const blog = blogs.find(blog => blog.id == id);
  if (!blog) {
      res.status(404).send('Post not found');
  } else {
      res.render('edit', { blog });
  }
});

app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const blogIndex = blogs.findIndex(blog => blog.id == id);
  if(id === -1) {
    res.status(404).send("Blog not found");
  } else {
    blogs[blogIndex] = {...blogs[blogIndex], title, content };
    res.redirect('/');
  }
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  blogs = blogs.filter(blog => blog.id != id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
