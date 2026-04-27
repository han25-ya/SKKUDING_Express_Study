const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');
const RestaurantRoutes = require('./routes/restaurant');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(RestaurantRoutes);

app.use((req, res) => {
  res.status(404).render('404', { error : 'Page Not Found' });
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});