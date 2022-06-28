const dotenv = require('dotenv');
const express = require('express');
dotenv.config();
const Session = require('express-session')

const PORT = process.env.PORT || 1234;
const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use(Session({
  resave: true,
  saveUninitialized: true,
  secret: "jkflzhyuirhqguiyrhsdjighrjqsdihfqsufghuqis--MIAOU--ghfjkdghfkjsdlhgjkfsdh",
  cookie: {
    secure: false,
    maxAge: (1000 * 60 * 60) // ça fait une heure
  }
}));

app.use((req, res, next) => {
  if (!req.session.deck) { //création d'un deck vide par défaut pour que le reste fonctionne
    req.session.deck = []
  }
  next()
})
app.use(router);

app.use((req, res) => {
  res.status(404).send('erreur 404');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
